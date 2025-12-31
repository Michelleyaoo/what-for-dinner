import { useNavigate } from 'react-router-dom'
import { Box, Flex, VStack, HStack, Container, Heading } from '@chakra-ui/react'
import Button from '../components/Button'
import Chip from '../components/Chip'
import RecipeCard from '../components/RecipeCard'

// Mock data for selected ingredients (will be passed as props later)
const selectedIngredients = ['🍅 Tomato', '🥔 Potato', '🧅 Onion', '🥩 Beef']

// Mock recipe data
const recipes = [
  {
    id: 1,
    title: 'Tomato and egg stir fry',
    prepTime: '20 mins',
    ingredients: ['🍅 Tomato', '🥚 Egg'],
    image: '1'
  },
  {
    id: 2,
    title: 'Cozy beef stew',
    prepTime: '45 mins',
    ingredients: ['🧅 Onion', '🥔 Potato', '🥩 Beef', '🥕 Carrot'],
    image: '2'
  },
  {
    id: 3,
    title: 'Thai red curry with beef',
    prepTime: '30 mins',
    ingredients: ['🧅 Onion', '🥔 Potato', '🥩 Beef'],
    image: '3'
  },
  {
    id: 4,
    title: 'Thai red curry with beef',
    prepTime: '30 mins',
    ingredients: ['🧅 Onion', '🥔 Potato', '🥩 Beef'],
    image: '3'
  },
  {
    id: 5,
    title: 'Thai red curry with beef',
    prepTime: '30 mins',
    ingredients: ['🧅 Onion', '🥔 Potato', '🥩 Beef'],
    image: '3'
  },
  {
    id: 6,
    title: 'Tomato and egg stir fry',
    prepTime: '20 mins',
    ingredients: ['🍅 Tomato', '🥚 Egg'],
    image: '1'
  },
  {
    id: 7,
    title: 'Cozy beef stew',
    prepTime: '45 mins',
    ingredients: ['🧅 Onion', '🥔 Potato', '🥩 Beef', '🥕 Carrot'],
    image: '2'
  },
  {
    id: 8,
    title: 'Thai red curry with beef',
    prepTime: '30 mins',
    ingredients: ['🧅 Onion', '🥔 Potato', '🥩 Beef'],
    image: '3'
  },
  {
    id: 9,
    title: 'Thai red curry with beef',
    prepTime: '30 mins',
    ingredients: ['🧅 Onion', '🥔 Potato', '🥩 Beef'],
    image: '3'
  },
  {
    id: 10,
    title: 'Thai red curry with beef',
    prepTime: '30 mins',
    ingredients: ['🧅 Onion', '🥔 Potato', '🥩 Beef'],
    image: '3'
  }
]

function ResultList() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/')
  }

  const handleRemoveIngredient = (ingredient) => {
    // Handle ingredient removal - will be implemented later
    console.log('Remove ingredient:', ingredient)
  }

  return (
    <Box
      minH="100vh"
      w="100%"
      bg="neutral.background"
    >
      {/* Header */}
      <Container
        maxW="90rem"
        px={{ base: '4', md: '10' }}
        pt={{ base: '4', md: '12' }}
        pb={0}
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'stretch', md: 'center' }}
          justify={{ base: 'flex-start', md: 'space-between' }}
          gap="4"
        >
          {/* Back Button */}
          <Button
            variant="tertiary"
            icon={true}
            onClick={handleBack}
            alignSelf={{ base: 'flex-start', md: 'auto' }}
          >
            Back
          </Button>

          {/* Selected Ingredients Chips */}
          <Box
            flex={{ base: '0', md: '1' }}
            maxW={{ base: '100%', md: '45rem' }}
          >
            <Box
              bg="white"
              border="1px solid"
              borderColor="neutral.border"
              borderRadius="lg"
              px="4"
              py="3"
              display="flex"
              alignItems="center"
              gap="2"
              flexWrap="wrap"
              minH="16"
            >
              {selectedIngredients.map((ingredient) => (
                <Chip
                  key={ingredient}
                  text={ingredient}
                  size="Small"
                  isSelected={true}
                  onClick={() => handleRemoveIngredient(ingredient)}
                />
              ))}
            </Box>
          </Box>

          {/* Empty space placeholder (for alignment on desktop only) */}
          <Box
            w="30"
            visibility="hidden"
            display={{ base: 'none', md: 'block' }}
          />
        </Flex>
      </Container>

      {/* Main Content */}
      <Container
        maxW="90rem"
        px={{ base: '4', md: '10' }}
        pt={{ base: '5', md: '10', lg: '28' }}
        pb="10"
      >
        <VStack
          spacing={{ base: '5', md: '10' }}
          align="stretch"
        >
          {/* Title */}
          <Heading
            as="h1"
            textStyle="title2"
            color="neutral.ink"
          >
            10 dishes you can make
          </Heading>

          {/* Recipe Cards Grid */}
          <Box
            display="grid"
            gridTemplateColumns={{
              base: 'repeat(1, 1fr)',      // < sm (< 480px): 1 card
              sm: 'repeat(2, 1fr)',        // sm-md (480px-768px): 2 cards
              md: 'repeat(3, 1fr)',        // md-xl (768px-1280px): 3 cards
              xl: 'repeat(4, 1fr)',        // > xl (> 1280px): 4 cards max
            }}
            gap={{ base: '4', md: '8' }}
          >
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                prepTime={recipe.prepTime}
                ingredients={recipe.ingredients}
                image={recipe.image}
              />
            ))}
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default ResultList

