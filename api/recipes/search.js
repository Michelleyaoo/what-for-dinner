import OpenAI from 'openai';
import { 
  RECIPE_SEARCH_SYSTEM_PROMPT, 
  buildRecipeSearchUserPrompt 
} from '../../src/prompts/recipeSearch.js';

/**
 * API Endpoint: Search for recipes based on ingredients
 * Method: POST
 * Body: { ingredients, maxPrepTime, servings, dietaryPreferences }
 * Returns: { recipes, totalResults }
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    // Extract request data
    const {
      ingredients = [],
      maxPrepTime = 30,
      servings = 2,
      dietaryPreferences = ['none']
    } = req.body;

    // Validate required fields
    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ 
        error: 'Missing required field: ingredients',
        message: 'Please provide at least one ingredient.'
      });
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
    const systemPrompt = RECIPE_SEARCH_SYSTEM_PROMPT;
    const userPrompt = buildRecipeSearchUserPrompt({
      ingredients,
      maxPrepTime,
      servings,
      dietaryPreferences
    });

    // Call OpenAI API
    console.log('Calling OpenAI API for recipe search...');
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 3000,
    });

    // Parse the response
    const responseText = completion.choices[0].message.content;
    const recipeData = JSON.parse(responseText);

    console.log(`Generated ${recipeData.totalResults} recipes successfully`);

    // Return the recipes
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
