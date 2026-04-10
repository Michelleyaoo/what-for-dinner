import { getFromServerCache, saveToServerCache } from '../utils/cache.js';

// Filler words that obscure the core dish name in TheMealDB lookups
const FILLER = /\b(with|and|the|a|an|of|in|on|style|inspired|homestyle|classic|easy|quick|simple|crispy|cheesy|creamy|spicy|hearty|healthy|traditional|authentic|rustic|sheet\s+pan|one\s+pan|one\s+pot|stove\s+top)\b/gi;
const STYLE_PREFIX = /^[\w]+-style\s+/i;

/**
 * Build a ranked list of queries to try against TheMealDB.
 * Tries the full title first, then progressively simpler variations
 * (cleaned, 4-word windows, 3-word windows, keywords).
 * Stops as soon as one returns a match.
 */
function mealDbQueries(title, imageSearchKeywords = []) {
  const seen = new Set();
  const add = (q) => {
    const s = q?.trim();
    if (s && s.length > 2 && !seen.has(s.toLowerCase())) {
      seen.add(s.toLowerCase());
      return s;
    }
    return null;
  };

  const candidates = [];

  // 1. Full original title
  candidates.push(add(title));

  // 2. Title with style prefix stripped ("Italian-Style Beef Stew" → "Beef Stew")
  const stripped = title.replace(STYLE_PREFIX, '').trim();
  candidates.push(add(stripped));

  // 3. Title with all filler words removed
  const clean = title.replace(FILLER, ' ').replace(/\s+/g, ' ').trim();
  candidates.push(add(clean));

  // 4. Sliding windows of the cleaned words (4-word, then 3-word subsets)
  const words = clean.split(' ').filter(w => w.length > 1);
  const windowSizes = [4, 3];
  for (const size of windowSizes) {
    if (words.length > size) {
      candidates.push(add(words.slice(0, size).join(' ')));       // front
      candidates.push(add(words.slice(-size).join(' ')));          // back
      if (words.length > size + 1) {
        candidates.push(add(words.slice(1, size + 1).join(' '))); // shifted
      }
    }
  }

  // 5. First imageSearchKeyword (LLM-simplified dish name)
  candidates.push(add(imageSearchKeywords?.[0]));

  // 6. First 2 significant words as a last TheMealDB attempt
  candidates.push(add(words.slice(0, 2).join(' ')));

  return candidates.filter(Boolean);
}

async function fetchFromMealDB(query) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
  );
  const data = await res.json();
  return data.meals?.[0]?.strMealThumb || null;
}

/**
 * API Endpoint: Fetch images for recipes (non-blocking)
 * Method: POST
 * Body: { recipes: [{ id, title, imageSearchKeywords }] }
 * Returns: { images: { [recipeId]: imageUrl | null } }
 *
 * Lookup cascade per recipe:
 *   1. Redis cache (24h) — skip all fetches if already resolved
 *   2. TheMealDB — tried with up to 3 progressively simpler queries
 *   3. Unsplash search — fallback for dishes TheMealDB doesn't recognise
 *   4. null — gradient placeholder shown in UI
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { recipes = [] } = req.body;

  if (recipes.length === 0) {
    return res.status(200).json({ images: {} });
  }

  const images = {};
  await Promise.all(
    recipes.map(async (recipe) => {
      const cacheKey = `image:${recipe.id}`;

      // 1. Redis cache — only trust successful URLs, not nulls
      const cached = await getFromServerCache(cacheKey);
      if (cached && cached !== 'null') {
        console.log(`Image cache hit for ${recipe.id}`);
        images[recipe.id] = cached;
        return;
      }

      const title = recipe.title || '';
      let imageUrl = null;

      // 2. TheMealDB — try progressively simpler queries until one matches
      const queries = mealDbQueries(title, recipe.imageSearchKeywords);
      for (const query of queries) {
        try {
          imageUrl = await fetchFromMealDB(query);
          if (imageUrl) {
            console.log(`TheMealDB match for "${query}" (recipe: ${recipe.id})`);
            break;
          }
        } catch (err) {
          console.warn(`TheMealDB error for "${query}":`, err.message);
        }
      }

      // 3. Unsplash fallback — only called when TheMealDB has no match
      if (!imageUrl && process.env.UNSPLASH_ACCESS_KEY) {
        const query = recipe.imageSearchKeywords?.[0] || title;
        console.log(`Unsplash fallback for "${query}"`);
        try {
          const upRes = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
          );
          const upData = await upRes.json();
          imageUrl = upData.results?.[0]?.urls?.regular || null;
        } catch (err) {
          console.warn(`Unsplash error for "${query}":`, err.message);
        }
      }

      images[recipe.id] = imageUrl;

      // Cache successful results so future requests skip both fetches
      if (imageUrl) saveToServerCache(cacheKey, imageUrl).catch(() => {});
    })
  );

  return res.status(200).json({ images });
}
