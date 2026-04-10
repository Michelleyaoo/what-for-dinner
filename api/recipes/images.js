/**
 * API Endpoint: Fetch Unsplash images for recipes (non-blocking)
 * Method: POST
 * Body: { recipes: [{ id, imageSearchKeywords }] }
 * Returns: { images: { [recipeId]: imageUrl | null } }
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { recipes = [] } = req.body;

  if (!process.env.UNSPLASH_ACCESS_KEY || recipes.length === 0) {
    return res.status(200).json({ images: {} });
  }

  const images = {};
  await Promise.all(
    recipes.map(async (recipe) => {
      try {
        const keywords = (recipe.imageSearchKeywords || []).join(' ');
        if (!keywords) {
          images[recipe.id] = null;
          return;
        }
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keywords)}&per_page=1&orientation=landscape&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
        );
        const data = await response.json();
        images[recipe.id] = data.results?.[0]?.urls?.regular || null;
      } catch {
        images[recipe.id] = null;
      }
    })
  );

  return res.status(200).json({ images });
}
