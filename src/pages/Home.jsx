import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Heading, Flex, VStack, Text } from '@chakra-ui/react'
import Chip from '../components/Chip'
import Button from '../components/Button'
import { removeEmojiFromIngredient, ingredientsToUrlParam } from '../utils/ingredients'

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
  const [error, setError] = useState(null)

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    )
    // Clear error when user changes selection
    if (error) setError(null)
  }

  const handleCook = () => {
    // Validate selection
    if (selectedIngredients.length === 0) {
      setError('Please select at least one ingredient')
      return
    }

    // Remove emojis from ingredients for API call
    const cleanIngredients = selectedIngredients.map(removeEmojiFromIngredient)
    
    // Navigate to results immediately - loading will happen there
    const ingredientsParam = ingredientsToUrlParam(cleanIngredients)
    navigate(`/results?ingredients=${ingredientsParam}`, {
      state: {
        searchParams: {
          ingredients: cleanIngredients,
          maxPrepTime: 30,
          servings: 2,
          dietaryPreferences: ['none']
        }
      }
    })
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
        gap="20"
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

        <VStack gap="4" w="100%" align="stretch">
          {/* Selected Ingredients Container - Replaces Input */}
          <Box
            bg="white"
            border="1px solid"
            borderColor="neutral.border"
            borderRadius="sm"
            px="4"
            py="3"
            height={selectedIngredients.length === 0 ? "68px" : "auto"}
            minH="68px"
            display="flex"
            alignItems="center"
            flexWrap="wrap"
            gap="3"
            transition="all 0.2s ease"
            _hover={{
              borderColor: "primary.200"
            }}
          >
            {selectedIngredients.length === 0 ? (
              <Text
                textStyle="bodyRegular"
                color="grey.400"
              >
                what I have in the fridge...
              </Text>
            ) : (
              selectedIngredients.map((ingredient) => (
                <Chip
                  key={ingredient}
                  text={ingredient}
                  isSelected={true}
                  onClick={() => toggleIngredient(ingredient)}
                  size="Small"
                />
              ))
            )}
          </Box>

          {/* Available Ingredients List */}
          <Flex 
            wrap="wrap" 
            gap="3"
            justify="center" 
            align="center"
            minH={{ base: 'auto', md: '26' }}
          >
            {INGREDIENTS.filter((ingredient) => !selectedIngredients.includes(ingredient)).map((ingredient) => (
              <Chip
                key={ingredient}
                text={ingredient}
                onClick={() => toggleIngredient(ingredient)}
                isSelected={false}
                size="Small"
              />
            ))}
          </Flex>
        </VStack>

        {/* Error Message */}
        {error && (
          <Box
            bg="red.50"
            border="1px solid"
            borderColor="red.200"
            borderRadius="md"
            px="4"
            py="3"
            w="100%"
            maxW="60"
          >
            <Text textStyle="bodyRegular" color="red.600" textAlign="center">
              {error}
            </Text>
          </Box>
        )}

        <Button 
          variant="primary"
          icon={false}
          w={{ base: '100%', md: '60' }} 
          maxW={{ base: '60' }}
          onClick={handleCook}
          disabled={selectedIngredients.length === 0}
          opacity={selectedIngredients.length === 0 ? 0.6 : 1}
        >
          Let's cook!
        </Button>
      </VStack>
    </Box>
  )
}

export default Home

