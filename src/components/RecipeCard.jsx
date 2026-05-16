import { Box, Flex, VStack, HStack } from '@chakra-ui/react'
import { Clock } from 'phosphor-react'
import Label from './Label'
import Image from './Image'

function RecipeCard({ 
  title = "Tomato and egg stir fry",
  prepTime = "20 mins",
  ingredients = [],
  image = "1",
  imageUrl,
  onClick
}) {
  const normalizedIngredients = ingredients.map((ingredient) => {
    if (typeof ingredient === 'string') {
      return { text: ingredient, state: 'Available' }
    }
    return ingredient
  })

  return (
    <Box
      bg="white"
      border="1.5px solid"
      borderColor="primary.600"
      borderRadius="sm"
      overflow="hidden"
      w="100%"
      h="100%"
      display="flex"
      flexDirection="column"
      cursor="pointer"
      boxShadow="card-peach"
      transition="all 0.2s ease"
      onClick={onClick}
    >
      {/* Recipe Image */}
      <Image src={imageUrl} image={image} alt={title} />

      {/* Content */}
      <VStack
        spacing="2"
        align="stretch"
        px="4"
        py="10"
        flex="1"
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

