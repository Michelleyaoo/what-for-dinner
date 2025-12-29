import { useState } from 'react'
import { Box, Heading, Input, Button, Flex, VStack } from '@chakra-ui/react'
import Chip from '../components/Chip'

const INGREDIENTS = [
  '🥬 Cabbage',
  '🍅 Tomato',
  '🥔 Potato',
  '🥕 Carrot',
  '🧅 Onion',
  '🥦 Broccoli',
  '🥚 Egg',
  '🥩 Beef',
  '🍗 Chicken',
  '🫘 Tofu',
]

function Home() {
  const [selectedIngredients, setSelectedIngredients] = useState([])

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    )
  }

  return (
    <Box
      minH="100vh"
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={{ base: 'md' }}
      py={{ base: 'xl', mobile: 'lg' }}
    >
      <VStack 
        spacing={{ base: '3xl', tablet: '2xl', mobile: 'xl' }}
        maxW="648px" 
        w="100%"
      >
        <Heading 
          as="h1" 
          textStyle="heading"
          textAlign="center"
          sx={{
            '@media (max-width: 768px)': {
              fontSize: '20px',
              lineHeight: '24px',
            },
            '@media (max-width: 480px)': {
              fontSize: '24px',
              lineHeight: '28px',
            },
          }}
        >
          🥘 What for dinner?
        </Heading>

        <VStack spacing="md" w="100%" align="stretch">
          <Input
            placeholder="what I have in the fridge..."
            value={selectedIngredients.join(', ')}
            readOnly
          />

          <Flex 
            wrap="wrap" 
            gap={{ base: 'md', mobile: 'sm' }}
            justify="center" 
            align="center"
            minH={{ base: '104px', mobile: 'auto' }}
          >
            {INGREDIENTS.map((ingredient) => (
              <Chip
                key={ingredient}
                text={ingredient}
                onClick={() => toggleIngredient(ingredient)}
                isSelected={selectedIngredients.includes(ingredient)}
              />
            ))}
          </Flex>
        </VStack>

        <Button w={{ base: '240px', mobile: '100%' }} maxW={{ mobile: '240px' }}>
          Let's cook!
        </Button>
      </VStack>
    </Box>
  )
}

export default Home

