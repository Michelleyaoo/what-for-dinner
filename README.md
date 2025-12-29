# What for Dinner?

A web app to help you decide what to cook based on ingredients you have in your fridge.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

This will start the development server, typically at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
what-for-dinner/
├── src/
│   ├── components/
│   │   └── Chip.jsx       # Ingredient chip component
│   ├── pages/
│   │   └── Home.jsx       # Home page component
│   ├── theme/
│   │   └── index.js       # Chakra UI theme configuration
│   ├── App.jsx            # Main app component with ChakraProvider
│   └── main.jsx           # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Chakra UI** - Component library with custom theme
- **Emotion** - CSS-in-JS (required by Chakra UI)

