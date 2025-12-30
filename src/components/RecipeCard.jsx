import { Box, Flex, VStack, HStack } from '@chakra-ui/react'
import { Clock } from 'phosphor-react'
import Label from './Label'

function RecipeCard({ 
  title = "Tomato and egg stir fry",
  prepTime = "20 mins",
  ingredients = []
}) {
  // Normalize ingredients to handle both string arrays and object arrays
  const normalizedIngredients = ingredients.map((ingredient) => {
    if (typeof ingredient === 'string') {
      return { text: ingredient, state: 'Available' }
    }
    return ingredient
  })
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="grey.100"
      borderRadius="sm"
      overflow="hidden"
      w="100%"
      display="flex"
      flexDirection="column"
    >
      {/* Image placeholder */}
      <Box
        w="100%"
        h="50"
        bg="grey.50"
        position="relative"
      >
        {/* Placeholder for image - will be replaced later */}
      </Box>

      {/* Content */}
      <VStack
        spacing="2"
        align="stretch"
        px="8"
        py="10"
      >
        {/* Title */}
        <Box
          textStyle="headlineSemibold"
          color="neutral.ink"
        >
          {title}
        </Box>

        {/* Time */}
        <HStack spacing="2" align="center">
          <Box
            as={Clock}
            size={20}
            color="grey.700"
          />
          <Box
            textStyle="subheadMedium"
            color="grey.700"
          >
            {prepTime}
          </Box>
        </HStack>

        {/* Ingredient labels */}
        <Flex
          wrap="wrap"
          gap="2"
          align="center"
        >
          {normalizedIngredients.map((ingredient, index) => (
            <Label
              key={index}
              text={ingredient.text}
              state={ingredient.state}
            />
          ))}
        </Flex>
      </VStack>
    </Box>
  )
}

export default RecipeCard

