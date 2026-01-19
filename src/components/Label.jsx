import { Badge } from '@chakra-ui/react'

function Label({ 
  text = "🍅 Tomato", 
  state = "Available" 
}) {
  // Map state to variant - note: design has typo "Avaliable" but we use "Available"
  const variant = state === "Available" || state === "Avaliable" ? "available" : "notAvailable"
  
  // Apply styles directly since theme recipe isn't being recognized
  const styles = variant === "available" ? {
    bg: 'primary.50',
    color: 'primary.500',
  } : {
    bg: 'grey.50',
    color: 'grey.500',
  }
  
  return (
    <Badge 
      variant={variant}
      display="inline-flex"
      alignItems="center"
      px='2'
      py='1.5'
      borderRadius='1'
      fontFamily="'Work Sans', sans-serif"
      textStyle="tinyLabelMedium"
      {...styles}
    >
      {text}
    </Badge>
  )
}

export default Label

