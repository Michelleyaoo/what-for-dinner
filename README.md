# What for Dinner?

An AI-powered recipe discovery app that suggests meals based on the ingredients you already have in your fridge. Select what you've got, and get personalized recipe ideas complete with step-by-step instructions, images, and video tutorials.

**Live demo:** Deployed on [Vercel](https://vercel.com)

## Features

- **Ingredient-based search** — Pick from 80+ common ingredients or type to search; the app generates recipes that prioritize what you already have
- **AI-generated recipes** — OpenAI produces up to 10 real, nutritionally balanced recipes tailored to your selection
- **Recipe detail pages** — Full cooking instructions with categorized ingredient lists (what you have, what you need, seasonings) and numbered steps
- **Streaming responses** — Recipe details stream via SSE for faster time-to-first-byte
- **Recipe images** — Automatic image lookup via TheMealDB with Unsplash fallback
- **Video tutorials** — YouTube Shorts carousel on each recipe detail page
- **Multi-layer caching** — Client-side `sessionStorage` cache + optional server-side Redis (Upstash) for cross-user caching with 24h TTL
- **Responsive design** — Mobile-first layout that adapts from 1-column to 4-column recipe grids
- **Skeleton loading states** — Animated placeholders while content loads
- **Storybook** — Component library with interactive docs and visual testing

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router 7, Chakra UI 3, Framer Motion, Lottie |
| Backend | Vercel Serverless Functions (Node.js) |
| AI | OpenAI API (GPT-4.1-mini) |
| Images | TheMealDB API, Unsplash API |
| Videos | YouTube Data API v3 |
| Caching | Upstash Redis (server), sessionStorage (client) |
| Build | Vite 5 |
| Testing | Vitest, Storybook 10, Playwright |
| Deployment | Vercel |

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Browser (React SPA)                                    │
│                                                         │
│  Home ──▶ ResultList ──▶ RecipeDetail                   │
│  (pick       (recipe       (instructions,               │
│  ingredients) cards)        images, videos)              │
└────────┬───────────┬──────────────┬─────────────────────┘
         │           │              │
         ▼           ▼              ▼
┌─────────────────────────────────────────────────────────┐
│  Vercel Serverless Functions  (/api)                    │
│                                                         │
│  POST /api/recipes/search     → OpenAI (recipe list)    │
│  POST /api/recipes/[id]       → OpenAI (recipe details) │
│  POST /api/recipes/images     → TheMealDB + Unsplash    │
│  POST /api/recipes/videos     → YouTube Data API v3     │
│                                                         │
│  ┌─────────────┐                                        │
│  │ Upstash Redis│  (optional server-side cache)         │
│  └─────────────┘                                        │
└─────────────────────────────────────────────────────────┘
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/Michelleyaoo/what-for-dinner.git
cd what-for-dinner
npm install
```

### Environment Variables

Copy the example file and fill in your keys:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | [OpenAI API key](https://platform.openai.com/api-keys) — powers recipe generation |
| `UNSPLASH_ACCESS_KEY` | No | [Unsplash developer key](https://unsplash.com/developers) — fallback recipe images |
| `YOUTUBE_API_KEY` | No | [YouTube Data API v3 key](https://console.developers.google.com) — video tutorials |
| `UPSTASH_REDIS_REST_URL` | No | [Upstash Redis](https://console.upstash.com) REST URL — server-side caching |
| `UPSTASH_REDIS_REST_TOKEN` | No | Upstash Redis REST token |

> Only `OPENAI_API_KEY` is required. Without the optional keys, the app gracefully degrades — images fall back to gradient placeholders and the video carousel shows an empty state.

### Development

The app uses Vercel serverless functions, so run the dev server with the Vercel CLI:

```bash
npx vercel dev
```

This starts the frontend (Vite) and the API routes together at `http://localhost:3000`.

### Build

```bash
npm run build
```

### Storybook

```bash
npm run storybook
```

Opens the component library at `http://127.0.0.1:6006`.

### Tests

```bash
npm run test-storybook
```

## Project Structure

```
what-for-dinner/
├── api/                        # Vercel serverless functions
│   ├── recipes/
│   │   ├── search.js           # POST — AI recipe search
│   │   ├── [id].js             # POST — AI recipe details (+ SSE streaming)
│   │   ├── images.js           # POST — TheMealDB / Unsplash image lookup
│   │   └── videos.js           # POST — YouTube Shorts lookup
│   └── utils/
│       └── cache.js            # Upstash Redis helper (get/set with TTL)
├── src/
│   ├── assets/                 # Static images and Lottie animations
│   ├── components/             # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Chip.jsx            # Ingredient chip (selectable)
│   │   ├── Image.jsx           # Recipe image with gradient fallback
│   │   ├── IngredientSearch.jsx# Searchable ingredient picker
│   │   ├── Label.jsx           # Ingredient label (Available / Missing)
│   │   ├── RecipeCard.jsx      # Recipe card for result grid
│   │   ├── RecipeCardSkeleton.jsx
│   │   ├── RecipeDetailSkeleton.jsx
│   │   ├── ShortVideo.jsx      # Video thumbnail card
│   │   └── *.stories.jsx       # Storybook stories
│   ├── data/
│   │   └── ingredients.js      # 80+ ingredients with emoji mappings
│   ├── pages/
│   │   ├── Home.jsx            # Landing — ingredient picker + animated title
│   │   ├── ResultList.jsx      # Search results grid with recipe cards
│   │   └── RecipeDetail.jsx    # Full recipe view with instructions + videos
│   ├── prompts/
│   │   ├── recipeSearch.js     # OpenAI system/user prompts for search
│   │   └── recipeDetails.js    # OpenAI system/user prompts for details
│   ├── theme/
│   │   └── index.js            # Chakra UI custom theme + design tokens
│   ├── utils/
│   │   ├── api.js              # Frontend API client (fetch wrappers)
│   │   ├── ingredients.js      # Ingredient string utilities
│   │   └── recipeCache.js      # Client-side sessionStorage cache
│   ├── App.jsx                 # Root component with routing
│   └── main.jsx                # Entry point
├── .storybook/                 # Storybook configuration
├── .env.example                # Environment variable template
├── vercel.json                 # Vercel SPA rewrite rules
├── vite.config.js              # Vite configuration
└── package.json
```

## How It Works

1. **Home page** — The user selects ingredients from a curated list or searches by name. A playful typing animation cycles through meal-related phrases.

2. **Recipe search** — On submit, the app calls `POST /api/recipes/search` which sends the ingredient list to OpenAI with a detailed system prompt that enforces real recipes, nutritional balance, and proper ingredient categorization. Results are cached in both Redis and `sessionStorage`.

3. **Result list** — Recipe cards appear in a responsive grid. Images are fetched in the background from TheMealDB (with progressive query simplification) and Unsplash as a fallback. The top 2 recipe details are prefetched for instant navigation.

4. **Recipe detail** — Tapping a card navigates to the full recipe view. Instructions stream via SSE for a faster experience. The page shows categorized ingredients, numbered steps, and a YouTube Shorts carousel.

## License

MIT
