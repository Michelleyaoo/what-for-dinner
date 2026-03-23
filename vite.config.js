import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// App + Storybook merge this file. Vitest config lives in vitest.config.js so
// `storybook dev` does not merge @storybook/addon-vitest browser wiring (which
// can trigger 404s for `/.storybook/preview.js` in the browser console).
export default defineConfig({
  plugins: [react()],
});
