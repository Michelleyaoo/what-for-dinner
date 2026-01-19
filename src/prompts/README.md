# Recipe Generation Prompts

This folder contains all OpenAI prompts used by the API endpoints. Keeping prompts separate makes them easier to maintain, version, and test.

## Files

### `recipeSearch.js`
- **Used by:** `/api/recipes/search`
- **Purpose:** Generate a list of recipe suggestions based on user's ingredients
- **Testing:** Test in OpenAI Playground, then update this file
- **Exports:**
  - `RECIPE_SEARCH_SYSTEM_PROMPT` - The main system prompt
  - `buildRecipeSearchUserPrompt()` - Helper function to format user input

### `recipeDetails.js`
- **Used by:** `/api/recipes/[id]`
- **Purpose:** Generate detailed cooking instructions for a specific recipe
- **Testing:** Test in OpenAI Playground, then update this file
- **Exports:**
  - `RECIPE_DETAILS_SYSTEM_PROMPT` - The main system prompt
  - `buildRecipeDetailsUserPrompt()` - Helper function to format recipe context

## How to Update Prompts

### 1. Test in OpenAI Playground
1. Go to [platform.openai.com/playground](https://platform.openai.com/playground)
2. Update your prompt and test with different inputs
3. Verify the JSON output matches your schema
4. Iterate until you're happy with the results

### 2. Update the Prompt File
1. Open the relevant file (`recipeSearch.js` or `recipeDetails.js`)
2. Replace the prompt text in the exported constant
3. Keep the helper function updated if needed

### 3. Test Locally
```bash
vercel dev
# Test your API endpoint with the updated prompt
```

### 4. Deploy
```bash
vercel deploy
```

## Prompt Architecture

### Recipe Search Flow
```
User selects ingredients
    ↓
Frontend calls /api/recipes/search
    ↓
API uses recipeSearch.js prompt
    ↓
OpenAI returns recipe list
    ↓
Frontend displays results
```

### Recipe Details Flow
```
User clicks a recipe
    ↓
Frontend calls /api/recipes/[id]
    ↓
API uses recipeDetails.js prompt
    ↓
OpenAI returns full recipe
    ↓
Frontend displays instructions
```

## Benefits of This Structure

✅ **Easy to Update** - Change prompt without touching API logic
✅ **Version Control** - Track prompt changes over time
✅ **Testing** - Test prompts independently
✅ **Reusability** - Use same prompts across different endpoints if needed
✅ **Documentation** - Clear separation between prompt and code

## Reference

Your tested prompts are also available in:
- `What for dinner prompt/list-prompt/` - Original search prompt
- `What for dinner prompt/details-prompt/` - Original details prompt

Keep these as reference but use the files in this folder for production.
