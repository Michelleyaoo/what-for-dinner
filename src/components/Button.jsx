import { Button as ChakraButton, Box } from '@chakra-ui/react'
import { ArrowLeft } from 'phosphor-react'

function Button({
  children,
  icon = true,
  iconElement,
  variant = 'primary',
  disabled = false,
  ...props
}) {
  // Icon to display - use provided iconElement or default ArrowLeft from Phosphor Icons
  // Icon color will inherit from button's color (currentColor)
  const iconComponent = icon
    ? iconElement || <ArrowLeft size={20} weight="regular" />
    : null

  return (
    <ChakraButton
      variant={variant}
      disabled={disabled}
      {...props}
    >
      {iconComponent && (
        <Box
          as="span"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          {iconComponent}
        </Box>
      )}
      {children}
    </ChakraButton>
  )
}

export default Button

