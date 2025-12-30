import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Heading, Input, Flex, VStack } from '@chakra-ui/react'
import Chip from '../components/Chip'
import Button from '../components/Button'

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
  const navigate = useNavigate()
  const [selectedIngredients, setSelectedIngredients] = useState([])

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    )
  }

  const handleCook = () => {
    navigate('/results')
  }

  return (
    <Box
      minH="100vh"
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={{ base: '4' }}
      py={{ base: '5', md: '10' }}
    >
      <VStack 
        spacing={{ base: '10', md: '14', lg: '20' }}
        maxW="40.5rem" 
        w="100%"
      >
        <Heading 
          as="h1" 
          textStyle="heading"
          textAlign="center"
          color="neutral.ink"
          sx={{
            '@media (max-width: 47.9375rem)': { // md breakpoint - 1
              textStyle: 'title2',
            },
            '@media (max-width: 29.9375rem)': { // sm breakpoint - 1
              textStyle: 'title1',
            },
          }}
        >
          🥘 What for dinner?
        </Heading>

        <VStack spacing="4" w="100%" align="stretch">
          <Input
            variant="outline"
            placeholder="what I have in the fridge..."
            value={selectedIngredients.join(', ')}
            readOnly
          />

          <Flex 
            wrap="wrap" 
            gap={{ base: '3', md: '4' }}
            justify="center" 
            align="center"
            minH={{ base: 'auto', md: '26' }}
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

        <Button 
          variant="primary"
          icon={false}
          w={{ base: '100%', md: '60' }} 
          maxW={{ base: '60' }}
          onClick={handleCook}
        >
          Let's cook!
        </Button>
      </VStack>
    </Box>
  )
}

export default Home

