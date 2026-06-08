import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let burstLimiter = null;
let dailyLimiter = null;

function getLimiters() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  if (burstLimiter && dailyLimiter) return { burstLimiter, dailyLimiter };

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  // 5 requests per 60-second window — stops scripts, allows normal browsing
  burstLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '60 s'),
    prefix: 'ratelimit:burst',
  });

  // 30 requests per 24 hours — generous for real users, limits daily abuse
  dailyLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, '24 h'),
    prefix: 'ratelimit:daily',
  });

  return { burstLimiter, dailyLimiter };
}

/**
 * Check rate limit for the request IP.
 * Runs burst and daily checks in parallel.
 * Returns null if allowed, or sends a 429 response if either limit is exceeded.
 */
export async function checkRateLimit(req, res) {
  const limiters = getLimiters();
  if (!limiters) return null;

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'anonymous';
  try {
    const [burst, daily] = await Promise.all([
      limiters.burstLimiter.limit(ip),
      limiters.dailyLimiter.limit(ip),
    ]);

    res.setHeader('X-RateLimit-Remaining-Burst', burst.remaining);
    res.setHeader('X-RateLimit-Remaining-Daily', daily.remaining);

    if (!burst.success) {
      return res.status(429).json({
        error: 'Too many requests',
        message: 'Please wait a moment before trying again.',
      });
    }
    if (!daily.success) {
      return res.status(429).json({
        error: 'Daily limit reached',
        message: "You've reached the daily search limit. Come back tomorrow!",
      });
    }
  } catch (err) {
    console.warn('Rate limit check failed:', err.message);
  }
  return null;
}
