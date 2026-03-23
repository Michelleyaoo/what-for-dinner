import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import system from '../src/theme/index.js'

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      test: "todo"
    },

    backgrounds: {
      default: 'neutral',
      values: [
        {
          name: 'neutral',
          value: '#fbf8f5',
        },
        {
          name: 'white',
          value: '#ffffff',
        },
        {
          name: 'cream',
          value: '#fff4e9',
        },
      ],
    },
  },

  decorators: [
    (Story) => (
      <ChakraProvider value={system}>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600&display=swap');
            body {
              font-family: 'Work Sans', sans-serif;
            }
          `}
        </style>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default preview;
