import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let ratelimit = null;

function getRatelimit() {
  if (ratelimit) return ratelimit;
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  ratelimit = new Ratelimit({
    redis: new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    }),
    // 20 requests per 60-second sliding window per IP
    limiter: Ratelimit.slidingWindow(20, '60 s'),
    prefix: 'ratelimit',
  });
  return ratelimit;
}

/**
 * Check rate limit for the request IP.
 * Returns null if allowed, or a Response-ready object if blocked.
 */
export async function checkRateLimit(req, res) {
  const limiter = getRatelimit();
  if (!limiter) return null;

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'anonymous';
  try {
    const { success, remaining, reset } = await limiter.limit(ip);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', reset);
    if (!success) {
      return res.status(429).json({
        error: 'Too many requests',
        message: 'Please wait a moment before trying again.',
      });
    }
  } catch (err) {
    console.warn('Rate limit check failed:', err.message);
  }
  return null;
}
