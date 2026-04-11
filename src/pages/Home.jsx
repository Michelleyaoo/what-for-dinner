import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Heading, Flex, VStack, Text } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import Chip from '../components/Chip'
import IngredientSearch from '../components/IngredientSearch'
import MobileSearchOverlay from '../components/MobileSearchOverlay'
import Button from '../components/Button'
import { removeEmojiFromIngredient, ingredientsToUrlParam } from '../utils/ingredients'
import { POPULAR_INGREDIENTS } from '../data/ingredients'
import foodPng from '../assets/images/food.png'

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

const PHRASES = [
  'What for dinner?',
  'Pizza for one',
  'Winner winner chicken dinner',
  'Pasta for two',
]

const TYPING_SPEED = 70
const ERASING_SPEED = 40
const PAUSE_AFTER_TYPE = 300
const PAUSE_BEFORE_NEXT = 300

const FOOD_IMAGE_SIZE = '80px'
const FOOD_SPIN_DURATION = '8s'
const CURSOR_BLINK_SPEED = '0.8s'

function Home() {
  const navigate = useNavigate()
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [error, setError] = useState(null)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  const [phraseIdx, setPhraseIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isErasing, setIsErasing] = useState(false)

  useEffect(() => {
    const current = PHRASES[phraseIdx]

    if (!isErasing && displayed.length < current.length) {
      const t = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        TYPING_SPEED
      )
      return () => clearTimeout(t)
    }

    if (!isErasing && displayed.length === current.length) {
      const t = setTimeout(() => setIsErasing(true), PAUSE_AFTER_TYPE)
      return () => clearTimeout(t)
    }

    if (isErasing && displayed.length > 0) {
      const t = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length - 1)),
        ERASING_SPEED
      )
      return () => clearTimeout(t)
    }

    if (isErasing && displayed.length === 0) {
      const t = setTimeout(() => {
        setPhraseIdx((i) => (i + 1) % PHRASES.length)
        setIsErasing(false)
      }, PAUSE_BEFORE_NEXT)
      return () => clearTimeout(t)
    }
  }, [displayed, isErasing, phraseIdx])

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
      flexDirection="column"
      alignItems="center"
      px={{ base: '4' }}
      overflowY="auto"
    >
      {/* Main content — vertically centered in available space */}
      <Flex
        flex="1"
        w="100%"
        maxW="40.5rem"
        alignItems="center"
        justifyContent="center"
        py={{ base: '5', md: '10' }}
      >
        <VStack gap="20" w="100%">
          <VStack gap="4" align="center">
            <Box
              as="img"
              src={foodPng}
              alt=""
              w={FOOD_IMAGE_SIZE}
              h={FOOD_IMAGE_SIZE}
              animation={`${spin} ${FOOD_SPIN_DURATION} linear infinite`}
            />
            <Heading
              as="h1"
              textStyle="heading"
              textAlign="center"
              color="neutral.ink"
              h="80px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                '@media (max-width: 47.9375rem)': {
                  textStyle: 'title2',
                  height: '48px',
                },
                '@media (max-width: 29.9375rem)': {
                  textStyle: 'title1',
                  height: '56px',
                },
              }}
            >
              {displayed}
              <Box
                as="span"
                animation={`${blink} ${CURSOR_BLINK_SPEED} step-start infinite`}
              >
                |
              </Box>
            </Heading>
          </VStack>

          <VStack gap="4" w="100%" align="stretch">
            {/* Desktop: inline search with dropdown */}
            <Box display={{ base: 'none', md: 'block' }}>
              <IngredientSearch
                selectedIngredients={selectedIngredients}
                onToggleIngredient={toggleIngredient}
              />
            </Box>

            {/* Mobile: tappable trigger that opens full-screen overlay */}
            <Box
              display={{ base: 'flex', md: 'none' }}
              bg="white"
              border="1px solid"
              borderColor="neutral.border"
              borderRadius="lg"
              px="4"
              py="3"
              minH="52px"
              alignItems="center"
              flexWrap="wrap"
              gap="2"
              cursor="text"
              onClick={() => setIsMobileSearchOpen(true)}
              _hover={{ borderColor: 'primary.100' }}
              transition="border-color 0.2s ease"
            >
              {selectedIngredients.length === 0 ? (
                <Text textStyle="subheadMedium" color="grey.400">
                  what I have in the fridge...
                </Text>
              ) : (
                selectedIngredients.map((ing) => (
                  <Box key={ing} onClick={(e) => e.stopPropagation()}>
                    <Chip
                      text={ing}
                      isSelected={true}
                      onClick={() => toggleIngredient(ing)}
                      size="Small"
                    />
                  </Box>
                ))
              )}
            </Box>

            {/* Quick-pick popular ingredients */}
            <Flex
              wrap="wrap"
              gap="3"
              justify="center"
              alignContent="flex-start"
              minH={{ base: '10rem', md: '6.5rem' }}
            >
              {POPULAR_INGREDIENTS.filter((ingredient) => !selectedIngredients.includes(ingredient)).map((ingredient) => (
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
        </VStack>
      </Flex>

      {/* Bottom section — pinned to bottom, button never moves */}
      <VStack
        w="100%"
        maxW="40.5rem"
        gap="4"
        pb={{ base: '8', md: '12' }}
        align="center"
      >
        {/* Error — space always reserved so button stays put */}
        <Box
          w="100%"
          maxW="60"
          minH="44px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {error && (
            <Box
              bg="red.50"
              border="1px solid"
              borderColor="red.200"
              borderRadius="md"
              px="4"
              py="3"
              w="100%"
            >
              <Text textStyle="bodyRegular" color="red.600" textAlign="center">
                {error}
              </Text>
            </Box>
          )}
        </Box>

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
      {/* Mobile search overlay */}
      {isMobileSearchOpen && (
        <MobileSearchOverlay
          selectedIngredients={selectedIngredients}
          onToggleIngredient={toggleIngredient}
          onClose={() => setIsMobileSearchOpen(false)}
        />
      )}
    </Box>
  )
}

export default Home

