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
  const iconComponent = icon
    ? iconElement || <ArrowLeft size={20} weight="bold" />
    : null

  return (
    <ChakraButton
      variant={variant}
      disabled={disabled}
      gap={icon ? '8px' : '0'}
      textStyle="headlineBold"
      {...props}
    >
      {iconComponent}
      {children}
    </ChakraButton>
  )
}

export default Button
