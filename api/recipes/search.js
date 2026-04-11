import OpenAI from 'openai';
import { 
  RECIPE_SEARCH_SYSTEM_PROMPT, 
  buildRecipeSearchUserPrompt 
} from '../../src/prompts/recipeSearch.js';
import {
  buildSearchCacheKey,
  getFromServerCache,
  saveToServerCache
} from '../utils/cache.js';
import { validateEnv } from '../utils/env.js';
import { checkRateLimit } from '../utils/rateLimit.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * API Endpoint: Search for recipes based on ingredients
 * Method: POST
 * Body: { ingredients, maxPrepTime, servings, dietaryPreferences }
 * Returns: { recipes, totalResults }
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const envError = validateEnv(['OPENAI_API_KEY']);
  if (envError) return res.status(500).json(envError);

  try {
    const {
      ingredients = [],
      maxPrepTime = 30,
      servings = 2,
      dietaryPreferences = ['none']
    } = req.body;

    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ 
        error: 'Missing required field: ingredients',
        message: 'Please provide at least one ingredient.'
      });
    }

    const cacheKey = buildSearchCacheKey(ingredients, maxPrepTime, servings, dietaryPreferences);
    const cached = await getFromServerCache(cacheKey);
    if (cached) {
      console.log('Server cache hit for search:', cacheKey);
      return res.status(200).json(typeof cached === 'string' ? JSON.parse(cached) : cached);
    }

    const rateLimited = await checkRateLimit(req, res);
    if (rateLimited) return;

    const userPrompt = buildRecipeSearchUserPrompt({
      ingredients,
      maxPrepTime,
      servings,
      dietaryPreferences
    });

    console.log('Calling OpenAI API for recipe search...');
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
      messages: [
        { role: 'system', content: RECIPE_SEARCH_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' },
      max_completion_tokens: 3000,
    }, { timeout: 25_000 });

    // Parse the response
    const responseText = completion.choices[0].message.content;
    const recipeData = JSON.parse(responseText);

    console.log(`Generated ${recipeData.totalResults} recipes successfully`);

    // Save to server-side cache (non-blocking)
    saveToServerCache(cacheKey, recipeData).catch(() => {});

    return res.status(200).json(recipeData);

  } catch (error) {
    console.error('Error in recipe search:', error);

    // Handle specific OpenAI errors
    if (error.code === 'insufficient_quota') {
      return res.status(402).json({
        error: 'API quota exceeded',
        message: 'OpenAI API quota has been exceeded. Please check your billing.'
      });
    }

    if (error.code === 'invalid_api_key') {
      return res.status(401).json({
        error: 'Invalid API key',
        message: 'The OpenAI API key is invalid.'
      });
    }

    // Generic error response
    return res.status(500).json({
      error: 'Internal server error',
      message: 'An error occurred while generating recipes. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
