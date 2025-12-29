import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: `'Work Sans', sans-serif`,
    body: `'Work Sans', sans-serif`,
  },
  // Spacing scale
  space: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '40px',
    '2xl': '60px',
    '3xl': '80px',
  },
  // Border radius
  radii: {
    sm: '8px',
    md: '24px',
    lg: '32px',
  },
  // Breakpoints - extending Chakra defaults
  breakpoints: {
    base: '0em',
    mobile: '30em', // 480px
    tablet: '48em', // 768px
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  },
  // Transitions
  transition: {
    fast: '0.2s ease',
  },
  // Typography text styles
  textStyles: {
    heading: {
      fontSize: '32px',
      fontWeight: 600,
      lineHeight: '40px',
      letterSpacing: 0,
    },
    title1: {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: '28px',
      letterSpacing: 0,
    },
    title2: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '24px',
      letterSpacing: 0,
    },
    title3: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '22px',
      letterSpacing: 0,
    },
    headlineSemibold: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '20px',
      letterSpacing: 0,
    },
    headlineMedium: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '20px',
      letterSpacing: 0,
    },
    bodyRegular: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '20px',
      letterSpacing: 0,
    },
    bodyParagraph: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
      letterSpacing: 0,
    },
    subheadSemibold: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '18px',
      letterSpacing: 0,
    },
    subheadMedium: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '18px',
      letterSpacing: 0,
    },
    subheadRegular: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '18px',
      letterSpacing: 0,
    },
    footnoteSemibold: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '16px',
      letterSpacing: 0,
    },
    footnoteMedium: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '16px',
      letterSpacing: 0,
    },
    tinyLabelSemibold: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: '14px',
      letterSpacing: 0,
    },
    tinyLabelMedium: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '16px',
      letterSpacing: 0,
    },
  },
  colors: {
    // Neutral colors
    neutral: {
      ink: '#333333',
      cream: '#fff4e9',
      background: '#fbf8f5',
      border: '#eedecd',
      borderHover: '#ffe9d0',
    },
    // Primary (Brand) colors
    primary: {
      50: '#fff4e8', // Background
      100: '#fddcb9', // Light / Selected
      200: '#ffc78c', // Default
      300: '#ffb86b', // Hover
      400: '#ffa850', // Active
      500: '#b55c00', // Dark
    },
    // Greyscale
    grey: {
      50: '#f5f5f5',
      100: '#ebebeb',
      200: '#d6d6d6',
      300: '#c2c2c2',
      400: '#adadad',
      500: '#999999',
      600: '#858585',
      700: '#707070',
      800: '#5c5c5c',
      900: '#474747',
    },
  },
  components: {
    // Custom Button styles
    Button: {
      baseStyle: {
        fontFamily: `'Work Sans', sans-serif`,
        fontWeight: 600,
        borderRadius: 'sm',
      },
      sizes: {
        md: {
          h: '48px',
          fontSize: '16px',
          px: 'md',
        },
      },
      variants: {
        primary: {
          bg: 'primary.200',
          color: 'neutral.ink',
          _hover: {
            bg: 'primary.300',
          },
          _active: {
            bg: 'primary.400',
          },
        },
      },
      defaultProps: {
        variant: 'primary',
        size: 'md',
      },
    },
    // Custom Input styles
    Input: {
      baseStyle: {
        field: {
          fontFamily: `'Work Sans', sans-serif`,
          borderRadius: 'lg',
        },
      },
      sizes: {
        md: {
          field: {
            h: '64px',
            fontSize: '16px',
            px: 'md',
          },
        },
      },
      variants: {
        outline: {
          field: {
            borderColor: 'neutral.border',
            _focus: {
              borderColor: 'primary.200',
              boxShadow: 'none',
            },
          },
        },
      },
      defaultProps: {
        variant: 'outline',
        size: 'md',
      },
    },
  },
  styles: {
    global: {
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      body: {
        bg: 'neutral.background',
        color: 'neutral.ink',
        fontFamily: `'Work Sans', sans-serif`,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
      '#root': {
        width: '100%',
        minHeight: '100vh',
      },
    },
  },
})

export default theme

