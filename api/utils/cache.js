import { Redis } from '@upstash/redis';

const DEFAULT_TTL = 60 * 60 * 24; // 24 hours

let redis = null;

function getRedis() {
  if (redis) return redis;
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  return redis;
}

export function buildSearchCacheKey(ingredients, maxPrepTime, servings, dietaryPreferences) {
  const sorted = [...ingredients].map(i => i.toLowerCase().trim()).sort().join(',');
  const diet = [...dietaryPreferences].sort().join(',');
  return `search:${sorted}:${maxPrepTime}:${servings}:${diet}`;
}

export function buildDetailsCacheKey(recipeId) {
  return `details:${recipeId}`;
}

export async function getFromServerCache(key) {
  const client = getRedis();
  if (!client) return null;
  try {
    return await client.get(key);
  } catch (error) {
    console.warn('Redis cache read failed:', error.message);
    return null;
  }
}

export async function saveToServerCache(key, data, ttl = DEFAULT_TTL) {
  const client = getRedis();
  if (!client) return;
  try {
    await client.set(key, JSON.stringify(data), { ex: ttl });
  } catch (error) {
    console.warn('Redis cache write failed:', error.message);
  }
}
