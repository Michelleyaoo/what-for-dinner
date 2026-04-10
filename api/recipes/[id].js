import OpenAI from 'openai';
import { 
  RECIPE_DETAILS_SYSTEM_PROMPT, 
  buildRecipeDetailsUserPrompt 
} from '../../src/prompts/recipeDetails.js';
import {
  buildDetailsCacheKey,
  getFromServerCache,
  saveToServerCache
} from '../utils/cache.js';

/**
 * API Endpoint: Get detailed recipe instructions
 * Method: POST
 * Body: { recipeId, recipeTitle, ingredients, matchedIngredients, additionalIngredients, servings, maxPrepTime }
 * Returns: { id, description, instructions, videoSearchTerms, cuisineType, difficulty }
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    // Extract recipe context from request
    const {
      recipeId,
      recipeTitle,
      ingredients = [],
      matchedIngredients = [],
      additionalIngredients = [],
      servings = 2,
      maxPrepTime
    } = req.body;

    // Validate required fields
    if (!recipeId || !recipeTitle) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'recipeId and recipeTitle are required.'
      });
    }

    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ 
        error: 'Missing required field: ingredients',
        message: 'Original ingredients list is required for context.'
      });
    }

    // Check server-side cache first
    const cacheKey = buildDetailsCacheKey(recipeId);
    const cached = await getFromServerCache(cacheKey);
    if (cached) {
      console.log('Server cache hit for details:', recipeId);
      return res.status(200).json(typeof cached === 'string' ? JSON.parse(cached) : cached);
    }

    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not configured');
      return res.status(500).json({ 
        error: 'Server configuration error',
        message: 'OpenAI API key is not configured.'
      });
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Build prompts using imported functions
    const systemPrompt = RECIPE_DETAILS_SYSTEM_PROMPT;
    const userPrompt = buildRecipeDetailsUserPrompt({
      recipeId,
      recipeTitle,
      ingredients,
      matchedIngredients,
      additionalIngredients,
      servings,
      maxPrepTime
    });

    const useStreaming = req.body?.stream === true;

    console.log(`Generating details for recipe: ${recipeId} (${recipeTitle})${useStreaming ? ' [streaming]' : ''}`);

    const openaiParams = {
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' },
      max_completion_tokens: 2000,
    };

    if (useStreaming) {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      });

      const stream = await openai.chat.completions.create({
        ...openaiParams,
        stream: true,
      });

      let fullContent = '';
      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content || '';
        if (delta) {
          fullContent += delta;
          res.write(`data: ${JSON.stringify({ type: 'chunk', content: delta })}\n\n`);
        }
      }

      const recipeDetails = JSON.parse(fullContent);
      saveToServerCache(cacheKey, recipeDetails).catch(() => {});
      res.write(`data: ${JSON.stringify({ type: 'done', data: recipeDetails })}\n\n`);
      return res.end();
    }

    const completion = await openai.chat.completions.create(openaiParams);
    const responseText = completion.choices[0].message.content;
    const recipeDetails = JSON.parse(responseText);

    console.log(`Generated details for recipe: ${recipeId} successfully`);

    saveToServerCache(cacheKey, recipeDetails).catch(() => {});

    return res.status(200).json(recipeDetails);

  } catch (error) {
    console.error('Error in recipe details generation:', error);

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

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      console.error('Failed to parse OpenAI response as JSON');
      return res.status(500).json({
        error: 'Invalid API response',
        message: 'Failed to parse recipe details. Please try again.'
      });
    }

    // Generic error response
    return res.status(500).json({
      error: 'Internal server error',
      message: 'An error occurred while generating recipe details. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
