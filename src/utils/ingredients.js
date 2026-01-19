/**
 * Utility functions for handling ingredient data
 */

// Emoji mapping for common ingredients
const INGREDIENT_EMOJIS = {
  'cabbage': '🥬',
  'tomato': '🍅',
  'potato': '🥔',
  'carrot': '🥕',
  'onion': '🧅',
  'broccoli': '🥦',
  'egg': '🥚',
  'eggs': '🥚',
  'beef': '🥩',
  'chicken': '🍗',
  'tofu': '🫘',
  'garlic': '🧄',
  'pepper': '🌶️',
  'mushroom': '🍄',
  'corn': '🌽',
  'eggplant': '🍆',
  'lettuce': '🥬',
  'cucumber': '🥒',
  'avocado': '🥑',
  'spinach': '🥬',
  'pork': '🥓',
  'fish': '🐟',
  'shrimp': '🦐',
  'cheese': '🧀',
  'pasta': '🍝',
  'rice': '🍚',
  'bread': '🍞',
  'noodles': '🍜'
};

/**
 * Add emoji to ingredient name if not already present
 * @param {string} ingredient - Ingredient name (e.g., "Tomato" or "🍅 Tomato")
 * @returns {string} Ingredient with emoji (e.g., "🍅 Tomato")
 */
export function addEmojiToIngredient(ingredient) {
  // If already has emoji, return as-is
  if (/\p{Emoji}/u.test(ingredient)) {
    return ingredient;
  }

  // Find matching emoji
  const lowerIngredient = ingredient.toLowerCase();
  for (const [key, emoji] of Object.entries(INGREDIENT_EMOJIS)) {
    if (lowerIngredient.includes(key)) {
      return `${emoji} ${ingredient}`;
    }
  }

  // No emoji found, return as-is
  return ingredient;
}

/**
 * Remove emoji from ingredient name
 * @param {string} ingredient - Ingredient with emoji (e.g., "🍅 Tomato")
 * @returns {string} Ingredient without emoji (e.g., "Tomato")
 */
export function removeEmojiFromIngredient(ingredient) {
  // Remove emoji and trim whitespace
  return ingredient.replace(/\p{Emoji}\s*/gu, '').trim();
}

/**
 * Convert ingredient array to URL-safe string
 * @param {string[]} ingredients - Array of ingredients
 * @returns {string} URL-encoded ingredient string
 */
export function ingredientsToUrlParam(ingredients) {
  // Remove emojis and join with commas
  const cleanIngredients = ingredients.map(removeEmojiFromIngredient);
  return encodeURIComponent(cleanIngredients.join(','));
}

/**
 * Parse ingredients from URL parameter
 * @param {string} urlParam - URL parameter string
 * @returns {string[]} Array of ingredients
 */
export function ingredientsFromUrlParam(urlParam) {
  if (!urlParam) return [];
  
  try {
    const decoded = decodeURIComponent(urlParam);
    return decoded.split(',').map(ing => ing.trim()).filter(Boolean);
  } catch (error) {
    console.error('Error parsing ingredients from URL:', error);
    return [];
  }
}

/**
 * Format ingredients for display (ensure consistent emoji format)
 * @param {string[]} ingredients - Array of ingredients
 * @returns {string[]} Formatted ingredients with emojis
 */
export function formatIngredientsForDisplay(ingredients) {
  return ingredients.map(addEmojiToIngredient);
}

/**
 * Check if an ingredient string has an emoji
 * @param {string} ingredient - Ingredient string
 * @returns {boolean} True if has emoji
 */
export function hasEmoji(ingredient) {
  return /\p{Emoji}/u.test(ingredient);
}
