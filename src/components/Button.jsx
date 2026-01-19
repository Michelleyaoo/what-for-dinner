import { Button as ChakraButton } from '@chakra-ui/react'
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
  const iconComponent = icon
    ? iconElement || <ArrowLeft size={20} weight="regular" />
    : null

  // Tertiary buttons need custom styling
  const customStyles = variant === 'tertiary' ? {
    gap: icon ? "8px" : "0",
    textStyle: "headlineSemibold",
  } : {
    gap: icon ? "8px" : "0",
    textStyle: "headlineSemibold",
  }

  return (
    <ChakraButton
      variant={variant}
      disabled={disabled}
      {...customStyles}
      {...props}
    >
      {iconComponent}
      {children}
    </ChakraButton>
  )
}

export default Button

