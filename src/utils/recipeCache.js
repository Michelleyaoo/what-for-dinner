/**
 * Cache utilities for recipes using sessionStorage
 * Reduces API calls and improves performance
 */

const CACHE_PREFIX = 'recipe_cache_'
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

/**
 * Generate cache key for recipe search
 * @param {string[]} ingredients - List of ingredients
 * @returns {string} Cache key
 */
export function getSearchCacheKey(ingredients) {
  const sortedIngredients = [...ingredients].sort().join(',')
  return `${CACHE_PREFIX}search_${sortedIngredients}`
}

/**
 * Generate cache key for recipe details
 * @param {string} recipeId - Recipe ID
 * @returns {string} Cache key
 */
export function getDetailsCacheKey(recipeId) {
  return `${CACHE_PREFIX}details_${recipeId}`
}

/**
 * Save data to cache with timestamp
 * @param {string} key - Cache key
 * @param {*} data - Data to cache
 */
export function saveToCache(key, data) {
  try {
    const cacheItem = {
      data,
      timestamp: Date.now()
    }
    sessionStorage.setItem(key, JSON.stringify(cacheItem))
  } catch (error) {
    console.warn('Failed to save to cache:', error)
  }
}

/**
 * Get data from cache if not expired
 * @param {string} key - Cache key
 * @returns {*} Cached data or null if not found/expired
 */
export function getFromCache(key) {
  try {
    const cached = sessionStorage.getItem(key)
    if (!cached) return null

    const { data, timestamp } = JSON.parse(cached)
    
    // Check if cache is expired
    if (Date.now() - timestamp > CACHE_DURATION) {
      sessionStorage.removeItem(key)
      return null
    }

    return data
  } catch (error) {
    console.warn('Failed to read from cache:', error)
    return null
  }
}

/**
 * Clear all recipe cache
 */
export function clearRecipeCache() {
  try {
    const keys = Object.keys(sessionStorage)
    keys.forEach(key => {
      if (key.startsWith(CACHE_PREFIX)) {
        sessionStorage.removeItem(key)
      }
    })
  } catch (error) {
    console.warn('Failed to clear cache:', error)
  }
}
