import { createSystem, defaultConfig, defineConfig, defineRecipe } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Neutral colors
        neutral: {
          ink: { value: '#333333' },
          cream: { value: '#fff4e9' },
          background: { value: '#fbf8f5' },
          border: { value: '#eedecd' },
          borderHover: { value: '#ffe9d0' },
        },
        // Primary (Brand) colors
        primary: {
          '50': { value: '#fff4e8' },
          '100': { value: '#fddcb9' },
          '200': { value: '#ffc78c' },
          '300': { value: '#ffb86b' },
          '400': { value: '#ffa850' },
          '500': { value: '#b55c00' },
          '600': { value: '#5b2e00' },
        },
        // Greyscale
        grey: {
          '50': { value: '#f5f5f5' },
          '100': { value: '#ebebeb' },
          '200': { value: '#d6d6d6' },
          '300': { value: '#c2c2c2' },
          '400': { value: '#adadad' },
          '500': { value: '#999999' },
          '600': { value: '#858585' },
          '700': { value: '#707070' },
          '800': { value: '#5c5c5c' },
          '900': { value: '#474747' },
        },
      },
      radii: {
        xs: { value: '4px' },
        sm: { value: '8px' },
        md: { value: '24px' },
        lg: { value: '32px' },
        xl: { value: '40px' },
      },
      fonts: {
        heading: { value: `'Work Sans', sans-serif` },
        body: { value: `'Work Sans', sans-serif` },
      },
      shadows: {
        card: { value: '0 2px 8px rgba(0, 0, 0, 0.1)' },
        cardHover: { value: '0 4px 16px rgba(0, 0, 0, 0.1)' },
        'card-peach': { value: '6px 6px 0px 0px #fddcb9' },
        'card-orange': { value: '12px 12px 0px 0px #ffc78c' },
        'video-orange': { value: '6px 6px 0px 0px #ffc78c' },
        'shadow-md': { value: '4px 4px 0 var(--chakra-colors-primary-600)' },
        'shadow-md-active': { value: '2px 2px 0 var(--chakra-colors-primary-600)' },
        'shadow-md-secondary': { value: '4px 4px 0 var(--chakra-colors-primary-500)' },
        'shadow-md-secondary-active': { value: '2px 2px 0 var(--chakra-colors-primary-500)' },
        'shadow-sm': { value: '2px 2px 0 var(--chakra-colors-primary-600)' },
      },
    },
    textStyles: {
      heading: {
        value: {
          fontSize: '32px',
          fontWeight: '600',
          lineHeight: '40px',
          letterSpacing: '0',
        },
      },
      title1: {
        value: {
          fontSize: '24px',
          fontWeight: '600',
          lineHeight: '28px',
          letterSpacing: '0',
        },
      },
      title2: {
        value: {
          fontSize: '20px',
          fontWeight: '600',
          lineHeight: '24px',
          letterSpacing: '0',
        },
      },
      title3: {
        value: {
          fontSize: '18px',
          fontWeight: '600',
          lineHeight: '22px',
          letterSpacing: '0',
        },
      },
      headlineSemibold: {
        value: {
          fontSize: '16px',
          fontWeight: '600',
          lineHeight: '20px',
          letterSpacing: '0',
        },
      },
      headlineBold: {
        value: {
          fontSize: '16px',
          fontWeight: '700',
          lineHeight: '20px',
          letterSpacing: '0',
        },
      },
      headlineMedium: {
        value: {
          fontSize: '16px',
          fontWeight: '500',
          lineHeight: '20px',
          letterSpacing: '0',
        },
      },
      bodyRegular: {
        value: {
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '20px',
          letterSpacing: '0',
        },
      },
      bodyParagraph: {
        value: {
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '24px',
          letterSpacing: '0',
        },
      },
      subheadSemibold: {
        value: {
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: '18px',
          letterSpacing: '0',
        },
      },
      subheadMedium: {
        value: {
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '18px',
          letterSpacing: '0',
        },
      },
      subheadRegular: {
        value: {
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '18px',
          letterSpacing: '0',
        },
      },
      footnoteSemibold: {
        value: {
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: '16px',
          letterSpacing: '0',
        },
      },
      footnoteMedium: {
        value: {
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '16px',
          letterSpacing: '0',
        },
      },
      tinyLabelSemibold: {
        value: {
          fontSize: '12px',
          fontWeight: '600',
          lineHeight: '14px',
          letterSpacing: '0',
        },
      },
      tinyLabelMedium: {
        value: {
          fontSize: '12px',
          fontWeight: '500',
          lineHeight: '16px',
          letterSpacing: '0',
        },
      },
    },
    breakpoints: {
      sm: '30rem',   // 480px
      md: '48rem',   // 768px
      lg: '62rem',   // 992px
      xl: '80rem',   // 1280px
      '2xl': '96rem', // 1536px
    },
    recipes: {
      button: defineRecipe({
        base: {
          fontFamily: 'body',
          fontWeight: '700',
          borderRadius: 'sm',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'box-shadow 0.1s ease, transform 0.1s ease, background 0.15s ease',
          cursor: 'pointer',
          outline: 'none',
          _focusVisible: {
            outline: '2px solid',
            outlineColor: 'primary.300',
            outlineOffset: '2px',
          },
        },
        variants: {
          variant: {
            primary: {
              bg: 'primary.200',
              color: 'primary.600',
              border: '1px solid',
              borderColor: 'primary.600',
              boxShadow: 'shadow-md',
              _hover: {
                bg: 'primary.100',
              },
              _active: {
                bg: 'primary.300',
                boxShadow: 'shadow-md-active',
                transform: 'translate(2px, 2px)',
              },
              _disabled: {
                opacity: 0.4,
                cursor: 'not-allowed',
                pointerEvents: 'none',
              },
            },
            tertiary: {
              bg: 'white',
              color: 'primary.500',
              border: '1px solid',
              borderColor: 'primary.500',
              boxShadow: 'shadow-md-secondary',
              _hover: {
                bg: 'primary.50',
              },
              _active: {
                bg: 'primary.100',
                boxShadow: 'shadow-md-secondary-active',
                transform: 'translate(2px, 2px)',
              },
              _disabled: {
                opacity: 0.4,
                cursor: 'not-allowed',
                pointerEvents: 'none',
              },
            },
            text: {
              bg: 'transparent',
              color: 'primary.500',
              border: 'none',
              boxShadow: 'none',
              px: '0',
              _hover: {
                color: 'primary.600',
              },
              _active: {
                color: 'primary.600',
              },
            },
          },
        },
        sizes: {
          md: {
            height: '48px',
            fontSize: '16px',
            px: '16px',
            py: '14px',
            minW: '48px',
          },
        },
        defaultVariants: {
          variant: 'primary',
          size: 'md',
        },
      }),
      input: defineRecipe({
        base: {
          field: {
            fontFamily: 'body',
            borderRadius: 'lg',
          },
        },
        variants: {
          outline: {
            field: {
              borderColor: 'neutral.border',
              _placeholder: {
                color: 'grey.500',
              },
              _focus: {
                borderColor: 'primary.200',
                boxShadow: 'none',
              },
            },
          },
        },
        sizes: {
          md: {
            field: {
              h: '16',
              fontSize: '16px',
              px: '4',
            },
          },
        },
        defaultVariants: {
          variant: 'outline',
          size: 'md',
        },
      }),
      tag: defineRecipe({
        base: {
          root: {
            fontFamily: 'body',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            transition: 'background 0.15s ease',
            color: 'primary.600',
            border: '1px solid',
            borderColor: 'primary.600',
            boxShadow: 'shadow-sm',
            px: '4',
            py: '3',
            borderRadius: 'md',
            height: 'auto',
          },
        },
        variants: {
          default: {
            root: {
              bg: 'primary.50',
              _hover: { bg: 'primary.100' },
            },
          },
          selected: {
            root: {
              bg: 'primary.100',
              _hover: { bg: 'primary.200' },
            },
          },
        },
        sizes: {
          sm: {
            label: { textStyle: 'subheadSemibold' },
          },
          md: {
            label: { textStyle: 'headlineSemibold' },
          },
        },
        defaultVariants: {
          variant: 'default',
          size: 'md',
        },
      }),
      badge: defineRecipe({
        base: {
          root: {
            fontFamily: 'body',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2',
            px: '2',
            py: '1.5',
            borderRadius: '0px',
            textStyle: 'tinyLabelMedium',
          },
        },
        variants: {
          variant: {
            available: {
              bg: 'primary.50',
              color: 'primary.500',
            },
            notAvailable: {
              bg: 'grey.50',
              color: 'grey.500',
            },
          },
        },
        defaultVariants: {
          variant: 'available',
        },
      }),
    },
  },
  globalCss: {
    '*': {
      margin: '0',
      padding: '0',
      boxSizing: 'border-box',
    },
    body: {
      bg: 'neutral.background',
      color: 'neutral.ink',
      fontFamily: `'Work Sans', sans-serif`,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      backgroundImage: "url('/bg.svg')",
      backgroundRepeat: 'repeat',
      backgroundSize: '16px 16px',
    },
    '@keyframes cursor-blink': {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0 },
    },
    '@keyframes sticker-wiggle': {
      '0%':   { transform: 'rotate(0deg)'  },
      '20%':  { transform: 'rotate(-8deg)' },
      '40%':  { transform: 'rotate(8deg)'  },
      '60%':  { transform: 'rotate(-5deg)' },
      '80%':  { transform: 'rotate(5deg)'  },
      '100%': { transform: 'rotate(0deg)'  },
    },
    '#root': {
      width: '100%',
      minHeight: '100vh',
    },
  },
})

const system = createSystem(defaultConfig, config)

export default system
