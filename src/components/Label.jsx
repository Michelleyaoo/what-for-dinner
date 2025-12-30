import { Badge } from '@chakra-ui/react'

function Label({ 
  text = "🍅 Tomato", 
  state = "Available" 
}) {
  // Map state to variant - note: design has typo "Avaliable" but we use "Available"
  const variant = state === "Available" || state === "Avaliable" ? "available" : "notAvailable"
  
  return (
    <Badge variant={variant}>
      {text}
    </Badge>
  )
}

export default Label

