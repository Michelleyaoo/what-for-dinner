import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Heading, Flex, VStack, Text } from '@chakra-ui/react'
import Chip from '../components/Chip'
import IngredientSearch from '../components/IngredientSearch'
import MobileSearchOverlay from '../components/MobileSearchOverlay'
import Button from '../components/Button'
import { removeEmojiFromIngredient, ingredientsToUrlParam } from '../utils/ingredients'
import { POPULAR_INGREDIENTS } from '../data/ingredients'
import VeggieStickers from '../components/VeggieStickers'

const CONTENT_MAX_W = '40.5rem'

const PHRASES = ['What for dinner?', 'Pizza for one?', 'Pasta for two?', 'Chicken dinner?']
const TYPING_SPEED    = 70    // ms per character typed
const DELETE_SPEED    = 35    // ms per character deleted
const PAUSE_AFTER_TYPED   = 1800  // ms pause when phrase is complete
const PAUSE_AFTER_DELETED = 350   // ms pause before next phrase begins

function Home() {
  const navigate = useNavigate()
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [error, setError] = useState(null)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [typingPhase, setTypingPhase] = useState('typing') // 'typing' | 'deleting'

  useEffect(() => {
    const phrase = PHRASES[phraseIndex]
    let timer

    if (typingPhase === 'typing') {
      if (displayText.length < phrase.length) {
        timer = setTimeout(() => setDisplayText(phrase.slice(0, displayText.length + 1)), TYPING_SPEED)
      } else {
        timer = setTimeout(() => setTypingPhase('deleting'), PAUSE_AFTER_TYPED)
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => setDisplayText(displayText.slice(0, -1)), DELETE_SPEED)
      } else {
        timer = setTimeout(() => {
          setPhraseIndex((i) => (i + 1) % PHRASES.length)
          setTypingPhase('typing')
        }, PAUSE_AFTER_DELETED)
      }
    }

    return () => clearTimeout(timer)
  }, [displayText, typingPhase, phraseIndex])

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    )
    if (error) setError(null)
  }

  const handleCook = () => {
    if (selectedIngredients.length === 0) {
      setError('Please select at least one ingredient')
      return
    }
    const cleanIngredients = selectedIngredients.map(removeEmojiFromIngredient)
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
      <VeggieStickers />
      {/* Main content — vertically centered in available space */}
      <Flex
        flex="1"
        w="100%"
        maxW={CONTENT_MAX_W}
        alignItems="center"
        justifyContent="center"
        py={{ base: '5', md: '10' }}
        position="relative"
        zIndex="2"
      >
        <VStack gap="20" w="100%">
          <Heading
            as="h1"
            textStyle="heading"
            fontSize={{ base: '32px', md: '40px' }}
            lineHeight={{ base: '40px', md: '48px' }}
            textAlign="center"
            color="neutral.ink"
          >
            {displayText}
            <Box
              as="span"
              aria-hidden
              ml="1px"
              animation="cursor-blink 1s step-end infinite"
            >
              |
            </Box>
          </Heading>

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
              borderColor="primary.600"
              borderRadius="lg"
              boxShadow="shadow-md"
              px="4"
              py="3"
              minH="52px"
              alignItems="center"
              flexWrap="wrap"
              gap="2"
              cursor="text"
              onClick={() => setIsMobileSearchOpen(true)}
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
        maxW={CONTENT_MAX_W}
        gap="4"
        pb={{ base: '8', md: '12' }}
        align="center"
        position="relative"
        zIndex="2"
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
        >
          Let's cook!
        </Button>
      </VStack>

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
