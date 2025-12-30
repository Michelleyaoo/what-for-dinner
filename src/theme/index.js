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
      },
      fonts: {
        heading: { value: `'Work Sans', sans-serif` },
        body: { value: `'Work Sans', sans-serif` },
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
          fontFamily: `'Work Sans', sans-serif`,
          fontWeight: '600',
          borderRadius: 'sm',
          display: 'flex',
          alignItems: 'center',
          gap: '2',
          transition: 'all 0.2s ease',
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
            _disabled: {
              opacity: '0.3',
              cursor: 'not-allowed',
              _hover: {
                bg: 'primary.200',
              },
            },
          },
          tertiary: {
            bg: 'transparent',
            color: 'primary.500',
            _hover: {
              color: 'primary.300',
            },
            _active: {
              color: 'primary.400',
            },
            _disabled: {
              opacity: '0.3',
              cursor: 'not-allowed',
              _hover: {
                color: 'primary.500',
              },
            },
          },
        },
        sizes: {
          md: {
            h: '12',
            fontSize: '16px',
            px: '4',
            py: '3.5',
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
            fontFamily: `'Work Sans', sans-serif`,
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
            fontFamily: `'Work Sans', sans-serif`,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            color: 'neutral.ink',
          },
        },
        variants: {
          default: {
            root: {
              bg: 'primary.50',
              border: '1px solid',
              borderColor: 'primary.100',
              _hover: {
                bg: 'neutral.borderHover',
                borderColor: 'primary.200',
              },
            },
          },
          selected: {
            root: {
              bg: 'primary.100',
              border: 'none',
              color: 'primary.500',
              _hover: {
                bg: 'primary.300',
              },
            },
          },
        },
        sizes: {
          sm: {
            root: {
              px: '4',
              py: '3',
              borderRadius: 'md',
            },
            label: {
              textStyle: 'subheadMedium',
            },
          },
          md: {
            root: {
              px: '4',
              py: '3',
              borderRadius: 'md',
            },
            label: {
              textStyle: 'headlineMedium',
            },
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
            fontFamily: `'Work Sans', sans-serif`,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2',
            px: '2',
            py: '1.5',
            borderRadius: 'xs',
            textStyle: 'tinyLabelMedium',
          },
        },
        variants: {
          available: {
            root: {
              bg: 'primary.50',
              color: 'primary.500',
            },
          },
          notAvailable: {
            root: {
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
    },
    '#root': {
      width: '100%',
      minHeight: '100vh',
    },
  },
})

const system = createSystem(defaultConfig, config)

export default system
