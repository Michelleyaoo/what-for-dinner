import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-vite',
  // Disable auto-composition of Chakra UI's hosted Storybook (avoids CORS errors
  // when fetching `stories.json` from storybook.chakra-ui.com from localhost).
  // See: https://storybook.js.org/docs/api/main-config/main-config-refs
  refs: {
    '@chakra-ui/react': { disable: true },
  },
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      server: {
        fs: {
          allow: [path.join(__dirname, '..'), __dirname],
        },
      },
    });
  },
};
export default config;
