/**
 * API Endpoint: Fetch YouTube Shorts for a recipe
 * Method: POST
 * Body: { videoSearchTerms, recipeTitle }
 * Returns: [{ id, thumbnail, link }]
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { videoSearchTerms = [], recipeTitle = '' } = req.body;

    if (!recipeTitle && (!videoSearchTerms || videoSearchTerms.length === 0)) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'At least one of recipeTitle or videoSearchTerms is required.'
      });
    }

    if (!process.env.YOUTUBE_API_KEY) {
      console.warn('YOUTUBE_API_KEY is not configured — returning empty video list');
      return res.status(200).json([]);
    }

    const searchQuery = [recipeTitle, ...videoSearchTerms].filter(Boolean).join(' ') + ' recipe';

    const params = new URLSearchParams({
      key: process.env.YOUTUBE_API_KEY,
      q: searchQuery,
      type: 'video',
      videoDuration: 'short',
      part: 'snippet',
      maxResults: '5',
    });

    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('YouTube API error:', errorData);
      return res.status(200).json([]); // Degrade gracefully
    }

    const data = await response.json();

    const videos = (data.items || [])
      .filter((item) => item.id?.videoId)
      .map((item) => ({
        id: item.id.videoId,
        thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || null,
        link: `https://www.youtube.com/shorts/${item.id.videoId}`,
      }));

    return res.status(200).json(videos);

  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return res.status(200).json([]); // Degrade gracefully so the page still loads
  }
}
