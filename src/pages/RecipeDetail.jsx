import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { Box, Flex, VStack, HStack, Container, Text } from '@chakra-ui/react'
import { Clock, ArrowLeft, ArrowRight } from 'phosphor-react'
import Button from '../components/Button'
import Label from '../components/Label'
import Image from '../components/Image'
import ShortVideo from '../components/ShortVideo'
import RecipeDetailSkeleton from '../components/RecipeDetailSkeleton'
import { getRecipeDetails, getErrorMessage } from '../utils/api'
import { ingredientsToUrlParam } from '../utils/ingredients'
import { getDetailsCacheKey, saveToCache, getFromCache } from '../utils/recipeCache'

// Mock video data - TODO: Integrate TikTok/Instagram API
const mockVideos = [
  { id: 1, thumbnail: null, link: 'https://example.com/video1' },
  { id: 2, thumbnail: null, link: 'https://example.com/video2' },
  { id: 3, thumbnail: null, link: 'https://example.com/video3' },
  { id: 4, thumbnail: null, link: 'https://example.com/video4' },
  { id: 5, thumbnail: null, link: 'https://example.com/video5' }
]

// Keep old mock data for fallback (will be removed later)
const recipeData = {
  1: {
    id: 1,
    title: 'Tomato and egg stir fry',
    description: 'Soft scrambled eggs coated in a sweet-savoury tomato sauce — a 20-minute comfort classic.',
    prepTime: '20 mins',
    servings: 2,
    ingredients: ['🍅 Tomato', '🥚 Egg'],
    image: '1',
    instructions: {
      ingredients: [
        '3–4 eggs',
        '2 medium tomatoes, cut into wedges',
        '1 small garlic clove, minced (optional)',
        'Green onions for garnish (optional)'
      ],
      seasoning: [
        '1 tsp soy sauce (optional)',
        '½–1 tsp sugar (helps balance acidity)',
        'Salt to taste',
        'Oil for cooking'
      ],
      steps: [
        'Prep the eggs\nBeat eggs with a pinch of salt. Heat oil in a pan, pour eggs in, and gently scramble until just set but still soft. Remove and set aside.',
        'Cook the tomatoes\nAdd a bit more oil. Sauté tomatoes until they soften and release juice (about 2–3 minutes). Add sugar + soy sauce (optional) for flavor.',
        'Combine\nAdd eggs back into the pan, gently folding them into the tomatoes. Cook another 30–60 seconds until everything mingles into a glossy sauce.',
        'Taste & adjust\nAdd salt or more sugar if needed depending on tomato acidity.',
        'Serve\nTop with green onions. Serve over rice。'
      ]
    },
    videos: [
      { id: 1, thumbnail: null, link: 'https://example.com/video1' },
      { id: 2, thumbnail: null, link: 'https://example.com/video2' },
      { id: 3, thumbnail: null, link: 'https://example.com/video3' },
      { id: 4, thumbnail: null, link: 'https://example.com/video4' },
      { id: 5, thumbnail: null, link: 'https://example.com/video5' }
    ]
  },
  2: {
    id: 2,
    title: 'Cozy beef stew',
    description: 'Tender beef slow-cooked with root vegetables in a rich, savory broth.',
    prepTime: '45 mins',
    servings: 4,
    ingredients: ['🧅 Onion', '🥔 Potato', '🥩 Beef', '🥕 Carrot'],
    image: '2',
    instructions: {
      ingredients: [
        '500g beef chuck, cubed',
        '3 potatoes, cubed',
        '2 carrots, sliced',
        '1 onion, diced',
        '2 cloves garlic, minced'
      ],
      seasoning: [
        '2 cups beef broth',
        '2 tbsp tomato paste',
        '1 tsp thyme',
        'Salt and pepper to taste',
        '2 tbsp oil'
      ],
      steps: [
        'Sear the beef\nHeat oil in a large pot. Season beef with salt and pepper, then sear until browned on all sides.',
        'Sauté aromatics\nAdd onion and garlic, cook until softened.',
        'Add liquids\nStir in tomato paste, then add beef broth and thyme. Bring to a boil.',
        'Simmer\nReduce heat, cover, and simmer for 30 minutes.',
        'Add vegetables\nAdd potatoes and carrots. Continue simmering for 15 minutes until vegetables are tender.'
      ]
    },
    videos: [
      { id: 1, thumbnail: null, link: 'https://example.com/video1' },
      { id: 2, thumbnail: null, link: 'https://example.com/video2' },
      { id: 3, thumbnail: null, link: 'https://example.com/video3' },
      { id: 4, thumbnail: null, link: 'https://example.com/video4' },
      { id: 5, thumbnail: null, link: 'https://example.com/video5' }
    ]
  },
  3: {
    id: 3,
    title: 'Thai red curry with beef',
    description: 'Aromatic Thai curry with tender beef and vegetables in a creamy coconut sauce.',
    prepTime: '30 mins',
    servings: 4,
    ingredients: ['🧅 Onion', '🥔 Potato', '🥩 Beef'],
    image: '3',
    instructions: {
      ingredients: [
        '400g beef, sliced thin',
        '2 potatoes, cubed',
        '1 onion, sliced',
        '1 red bell pepper, sliced',
        '400ml coconut milk'
      ],
      seasoning: [
        '3 tbsp red curry paste',
        '1 tbsp fish sauce',
        '1 tbsp sugar',
        'Thai basil for garnish',
        '2 tbsp oil'
      ],
      steps: [
        'Fry curry paste\nHeat oil in a wok. Add curry paste and fry until fragrant.',
        'Add beef\nAdd beef slices and stir-fry until slightly cooked.',
        'Pour coconut milk\nAdd coconut milk, fish sauce, and sugar. Stir well.',
        'Add vegetables\nAdd potatoes and simmer until tender, then add onion and bell pepper.',
        'Finish\nCook for another 5 minutes. Garnish with Thai basil and serve with rice.'
      ]
    },
    videos: [
      { id: 1, thumbnail: null, link: 'https://example.com/video1' },
      { id: 2, thumbnail: null, link: 'https://example.com/video2' },
      { id: 3, thumbnail: null, link: 'https://example.com/video3' },
      { id: 4, thumbnail: null, link: 'https://example.com/video4' },
      { id: 5, thumbnail: null, link: 'https://example.com/video5' }
    ]
  }
}

function RecipeDetail() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  
  const [recipe, setRecipe] = useState(null)
  const [recipeDetails, setRecipeDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  useEffect(() => {
    // Get recipe from navigation state
    const recipeFromState = location.state?.recipe
    const searchContext = location.state?.searchContext

    if (!recipeFromState) {
      // No recipe in state, redirect to home
      navigate('/')
      return
    }

    setRecipe(recipeFromState)
    fetchRecipeDetails(recipeFromState, searchContext)
  }, [id, location.state, navigate])

  const fetchRecipeDetails = async (recipeData, searchContext) => {
    // Check cache first
    const cacheKey = getDetailsCacheKey(recipeData.id)
    const cachedDetails = getFromCache(cacheKey)
    
    if (cachedDetails) {
      console.log('✨ Using cached recipe details')
      setRecipeDetails(cachedDetails)
      setIsLoading(false)
      return // Skip API call!
    }

    // If not in cache, fetch from API
    setIsLoading(true)
    setError(null)

    try {
      // Prepare context for API call
      const context = {
        recipeId: recipeData.id,
        recipeTitle: recipeData.title,
        ingredients: searchContext?.ingredients || [],
        matchedIngredients: recipeData.matchedIngredients || [],
        additionalIngredients: recipeData.additionalIngredients || [],
        servings: searchContext?.servings || 2,
        maxPrepTime: searchContext?.maxPrepTime
      }

      const details = await getRecipeDetails(context)
      setRecipeDetails(details)

      // Save to cache
      saveToCache(cacheKey, details)
      console.log('💾 Saved recipe details to cache')
    } catch (err) {
      console.error('Error fetching recipe details:', err)
      setError(getErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    // Get ingredients from search context to navigate back to results
    const recipeFromState = location.state?.recipe
    const searchContext = location.state?.searchContext
    
    if (searchContext?.ingredients) {
      const ingredientsParam = ingredientsToUrlParam(searchContext.ingredients)
      navigate(`/results?ingredients=${ingredientsParam}`)
    } else {
      // Fallback to browser back if no context
      navigate(-1)
    }
  }

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNextVideo = () => {
    setCurrentVideoIndex((prev) => 
      Math.min(mockVideos.length - 1, prev + 1)
    )
  }

  const toggleInstructions = () => {
    setIsExpanded(!isExpanded)
  }

  // Loading state - show skeleton
  if (isLoading || !recipe) {
    return <RecipeDetailSkeleton />
  }

  // Error state
  if (error) {
    return (
      <Box minH="100vh" w="100%" bg="neutral.background">
        <Container maxW="1440px" px={{ base: '4', md: '10' }} pt={{ base: '4', md: '12' }}>
          <Button variant="tertiary" icon={true} onClick={handleBack}>
            Back
          </Button>
        </Container>
        <Container maxW="800px" px={{ base: '4', md: '10' }} pt="10">
          <Box
            bg="red.50"
            border="1px solid"
            borderColor="red.200"
            borderRadius="lg"
            px="6"
            py="4"
            textAlign="center"
          >
            <Text textStyle="bodyRegular" color="red.600" mb="3">
              {error}
            </Text>
            <Button variant="secondary" onClick={handleBack}>
              Go Back
            </Button>
          </Box>
        </Container>
      </Box>
    )
  }

  // Combine recipe list data with fetched details
  const fullRecipe = {
    ...recipe,
    ...recipeDetails,
    videos: mockVideos, // TODO: Use videoSearchTerms to fetch real videos
    servings: recipeDetails?.servings || 2
  }

  return (
    <Box
      minH="100vh"
      w="100%"
      bg="neutral.background"
      position="relative"
    >
      {/* Back Button - Fixed position */}
      <Container
        maxW="1440px"
        px={{ base: '4', md: '10' }}
        pt={{ base: '4', md: '12' }}
        pb={0}
      >
        <Flex
          justify="space-between"
          align="center"
        >
          <Button
            variant="tertiary"
            icon={true}
            onClick={handleBack}
          >
            Back
          </Button>
          {/* Spacer for symmetry */}
          <Box visibility="hidden">
            <Button variant="tertiary" icon={true}>Back</Button>
          </Box>
        </Flex>
      </Container>

      {/* Main Content Card */}
      <Container
        maxW="800px"
        px={{ base: '4', md: '10' }}
        pt={{ base: '0', md: '0' }}
        pb="10"
      >
        <Box
          bg="white"
          borderTopRadius="xl"
          overflowX="hidden"
          overflowY="visible"
          mt={{ base: '4', md: '0' }}
        >
          <VStack
            spacing="10"
            align="stretch"
            gap="10"
            p={{ base: '6', md: '10' }}
            overflow="visible"
          >
            {/* Hero Image */}
            <Image 
              image={fullRecipe.image || '1'}
              alt={fullRecipe.title}
              h="320px"
              borderRadius="lg"
            />

            {/* Recipe Info Section */}
            <VStack
              spacing="2"
              align="stretch"
              px="4"
              pb="10"
              borderBottom="1px solid"
              borderColor="grey.100"
            >
              {/* Title */}
              <Box
                textStyle="title1"
                color="neutral.ink"
              >
                {fullRecipe.title}
              </Box>

              {/* Description */}
              <Box
                textStyle="bodyParagraph"
                color="neutral.ink"
              >
                {fullRecipe.description}
              </Box>

              {/* Prep Time */}
              <HStack spacing="2" align="center">
                <Box
                  as={Clock}
                  size={20}
                  color="grey.700"
                />
                <Box
                  textStyle="footnoteMedium"
                  color="grey.700"
                >
                  {fullRecipe.prepTime}
                </Box>
              </HStack>

              {/* Ingredient Labels */}
              <Flex
                wrap="wrap"
                gap="2"
                align="center"
              >
                {fullRecipe.matchedIngredients?.map((ingredient, index) => (
                  <Label
                    key={index}
                    text={ingredient}
                    state="Available"
                  />
                ))}
                {fullRecipe.additionalIngredients?.map((ingredient, index) => (
                  <Label
                    key={`add-${index}`}
                    text={ingredient}
                    state="Missing"
                  />
                ))}
              </Flex>
            </VStack>

            {/* Recipe Instructions Section */}
            <VStack
              spacing="6"
              align="stretch"
              pb="10"
              borderBottom="1px solid"
              borderColor="grey.100"
            >
              <Box
                textStyle="title2"
                color="neutral.ink"
              >
                🧑‍🍳 How to make ({fullRecipe.servings} servings)
              </Box>

              <VStack
                spacing="8"
                align="stretch"
              >
                {/* Collapsible Content */}
                <Box
                  overflow="hidden"
                  maxH={isExpanded ? 'none' : '280px'}
                  position="relative"
                >
                  <Box>
                    {/* Ingredients from User */}
                    {fullRecipe.instructions?.ingredientsFromUser && fullRecipe.instructions.ingredientsFromUser.length > 0 && (
                      <VStack spacing="2" align="stretch" mb="8">
                        <Box textStyle="headlineSemibold" color="neutral.ink">
                          🥣 Ingredients (You Have)
                        </Box>
                        <Box
                          as="ul"
                          pl="6"
                          textStyle="bodyParagraph"
                          color="neutral.ink"
                          listStyleType="disc"
                          listStylePosition="outside"
                        >
                          {fullRecipe.instructions.ingredientsFromUser.map((item, index) => (
                            <Box as="li" key={index}>
                              {item}
                            </Box>
                          ))}
                        </Box>
                      </VStack>
                    )}

                    {/* Additional Ingredients Needed */}
                    {fullRecipe.instructions?.ingredientsNotFromUser && fullRecipe.instructions.ingredientsNotFromUser.length > 0 && (
                      <VStack spacing="2" align="stretch" mb="10">
                        <Box textStyle="headlineSemibold" color="neutral.ink">
                          🛒 Additional Ingredients Needed
                        </Box>
                        <Box
                          as="ul"
                          pl="6"
                          textStyle="bodyParagraph"
                          color="neutral.ink"
                          listStyleType="disc"
                          listStylePosition="outside"
                        >
                          {fullRecipe.instructions.ingredientsNotFromUser.map((item, index) => (
                            <Box as="li" key={index}>
                              {item}
                            </Box>
                          ))}
                        </Box>
                      </VStack>
                    )}

                    {/* Condiments and Seasonings */}
                    {fullRecipe.instructions?.condimentsAndSeasonings && fullRecipe.instructions.condimentsAndSeasonings.length > 0 && (
                      <VStack spacing="2" align="stretch" mb="10">
                        <Box textStyle="headlineSemibold" color="neutral.ink">
                          🧂 Condiments & Seasonings
                        </Box>
                        <Box
                          as="ul"
                          pl="6"
                          textStyle="bodyParagraph"
                          color="neutral.ink"
                          listStyleType="disc"
                          listStylePosition="outside"
                        >
                          {fullRecipe.instructions.condimentsAndSeasonings.map((item, index) => (
                            <Box as="li" key={index}>
                              {item}
                            </Box>
                          ))}
                        </Box>
                      </VStack>
                    )}

                    {/* Steps */}
                    {fullRecipe.steps && fullRecipe.steps.length > 0 && (
                      <VStack spacing="2" align="stretch">
                        <Box textStyle="headlineSemibold" color="neutral.ink">
                          🔪 Steps
                        </Box>
                        <Box
                          as="ul"
                          pl="6"
                          textStyle="bodyParagraph"
                          color="neutral.ink"
                          listStyleType="decimal"
                          listStylePosition="outside"
                        >
                          {fullRecipe.steps.map((step, index) => (
                            <Box as="li" key={index} mb="1">
                              {step}
                            </Box>
                          ))}
                        </Box>
                      </VStack>
                    )}
                  </Box>
                </Box>

                {/* View All Button */}
                <Box alignSelf="flex-start">
                  <Button
                    variant="tertiary"
                    icon={false}
                    onClick={toggleInstructions}
                  >
                    {isExpanded ? 'Show less' : 'View all'}
                  </Button>
                </Box>
              </VStack>
            </VStack>

            {/* Video Carousel Section */}
            <VStack
              spacing="6"
              align="stretch"
              overflow="visible"
            >
              {/* Section Header */}
              <Flex
                justify="space-between"
                align="center"
              >
                <Box
                  textStyle="title2"
                  color="neutral.ink"
                >
                  🍳 See how others make it
                </Box>

                {/* Navigation Arrows */}
                <HStack spacing="4">
                  <Button
                    variant="tertiary"
                    icon={true}
                    iconElement={<ArrowLeft size={20} weight="regular" />}
                    onClick={handlePrevVideo}
                    disabled={currentVideoIndex === 0}
                  >
                  </Button>
                  <Button
                    variant="tertiary"
                    icon={true}
                    iconElement={<ArrowRight size={20} weight="regular" />}
                    onClick={handleNextVideo}
                    disabled={currentVideoIndex >= fullRecipe.videos.length - 1}
                  >
                  </Button>
                </HStack>
              </Flex>

              {/* Video Carousel */}
              <Box
                w="100%"
                overflowX="hidden"
                overflowY="visible"
                pt="1"
                mt="-1"
              >
                <Flex
                  gap="6"
                  transition="transform 0.3s ease"
                  transform={`translateX(-${currentVideoIndex * (240 + 24)}px)`}
                >
                  {fullRecipe.videos.map((video) => (
                    <ShortVideo
                      key={video.id}
                      thumbnail={video.thumbnail}
                      link={video.link}
                      alt={`${fullRecipe.title} video ${video.id}`}
                    />
                  ))}
                </Flex>
              </Box>

              {/* Carousel Dots */}
              <Flex
                justify="center"
                gap="2"
              >
                {fullRecipe.videos.map((video, index) => (
                  <Box
                    key={video.id}
                    w="2"
                    h="2"
                    borderRadius="full"
                    bg={index === currentVideoIndex ? 'neutral.ink' : 'grey.300'}
                    cursor="pointer"
                    onClick={() => setCurrentVideoIndex(index)}
                    transition="background 0.2s ease"
                  />
                ))}
              </Flex>
            </VStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}

export default RecipeDetail

