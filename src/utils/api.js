/**
 * API utility functions for making requests to the backend
 */

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' // Vercel automatically handles this
  : 'http://localhost:3000'; // For local development with vercel dev

/**
 * Search for recipes based on ingredients
 * @param {Object} params - Search parameters
 * @param {string[]} params.ingredients - List of available ingredients
 * @param {number} [params.maxPrepTime=30] - Maximum prep time in minutes
 * @param {number} [params.servings=2] - Number of servings
 * @param {string[]} [params.dietaryPreferences=['none']] - Dietary restrictions
 * @returns {Promise<{recipes: Array, totalResults: number}>}
 */
export async function searchRecipes({ 
  ingredients, 
  maxPrepTime = 30, 
  servings = 2, 
  dietaryPreferences = ['none'] 
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/recipes/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients,
        maxPrepTime,
        servings,
        dietaryPreferences
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
}

/**
 * Get detailed recipe instructions
 * @param {Object} recipeContext - Recipe context from search results
 * @param {string} recipeContext.recipeId - Unique recipe identifier
 * @param {string} recipeContext.recipeTitle - Recipe title
 * @param {string[]} recipeContext.ingredients - Original ingredients list
 * @param {string[]} recipeContext.matchedIngredients - Matched ingredients
 * @param {string[]} recipeContext.additionalIngredients - Additional ingredients needed
 * @param {number} recipeContext.servings - Number of servings
 * @param {number} [recipeContext.maxPrepTime] - Max prep time
 * @returns {Promise<Object>} Detailed recipe instructions
 */
export async function getRecipeDetails(recipeContext) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/recipes/${recipeContext.recipeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeContext)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
}

/**
 * Get detailed recipe instructions via SSE streaming.
 * Returns faster TTFT and allows progress tracking.
 * Falls back to the standard non-streaming call on error.
 */
export async function getRecipeDetailsStreaming(recipeContext, onChunk) {
  const response = await fetch(`${API_BASE_URL}/api/recipes/${recipeContext.recipeId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...recipeContext, stream: true }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split('\n\n');
    buffer = parts.pop();

    for (const part of parts) {
      if (!part.startsWith('data: ')) continue;
      try {
        const event = JSON.parse(part.slice(6));
        if (event.type === 'done') return event.data;
        if (event.type === 'chunk' && onChunk) onChunk(event.content);
      } catch {
        // skip malformed event
      }
    }
  }

  throw new Error('Stream ended without complete recipe data');
}

/**
 * Try to fetch cached recipe details by ID (GET, no generation).
 * Returns null if the recipe is not cached server-side.
 */
export async function getCachedRecipeDetails(recipeId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/recipes/${recipeId}`);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

/**
 * Fetch Unsplash images for recipes (called after search results load)
 * @param {Array<{id: string, imageSearchKeywords: string[]}>} recipes
 * @returns {Promise<{images: Object<string, string|null>}>}
 */
export async function getRecipeImages(recipes) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/recipes/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipes })
    });

    if (!response.ok) {
      return { images: {} };
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching recipe images:', error);
    return { images: {} };
  }
}

/**
 * Fetch YouTube Shorts videos for a recipe
 * @param {Object} params
 * @param {string[]} params.videoSearchTerms - Search terms from recipe details
 * @param {string} params.recipeTitle - Recipe title used as primary search query
 * @returns {Promise<Array<{id: string, thumbnail: string|null, link: string}>>}
 */
export async function getRecipeVideos({ videoSearchTerms = [], recipeTitle = '' }) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/recipes/videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoSearchTerms, recipeTitle })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching recipe videos:', error);
    return []; // Non-fatal — carousel will show fallback
  }
}

/**
 * Handle API errors with user-friendly messages
 * @param {Error} error - The error object
 * @returns {string} User-friendly error message
 */
export function getErrorMessage(error) {
  if (!error) return 'An unknown error occurred';
  
  if (error.message) {
    // Check for specific error patterns
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return 'Unable to connect. Please check your internet connection.';
    }
    if (error.message.includes('quota')) {
      return 'Service temporarily unavailable. Please try again later.';
    }
    return error.message;
  }
  
  return 'Something went wrong. Please try again.';
}
