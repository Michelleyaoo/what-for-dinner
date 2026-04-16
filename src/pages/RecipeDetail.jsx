import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { Box, Flex, VStack, HStack, Container, Text, DialogRoot, DialogBackdrop, DialogPositioner, DialogContent, DialogCloseTrigger } from '@chakra-ui/react'
import { Clock, ArrowLeft, ArrowRight } from 'phosphor-react'
import Button from '../components/Button'
import Label from '../components/Label'
import Image from '../components/Image'
import ShortVideo from '../components/ShortVideo'
import RecipeDetailLoading from '../components/RecipeDetailLoading'
import { getRecipeDetails, getRecipeDetailsStreaming, getRecipeVideos, getCachedRecipeDetails, getErrorMessage } from '../utils/api'
import { ingredientsToUrlParam } from '../utils/ingredients'
import { getDetailsCacheKey, saveToCache, getFromCache } from '../utils/recipeCache'

const VIDEO_PLACEHOLDERS = Array.from({ length: 5 }, (_, i) => ({ id: i + 1 }))

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
  const [videos, setVideos] = useState(null) // null = loading, [] = none found, [...] = loaded
  const [selectedVideo, setSelectedVideo] = useState(null)

  useEffect(() => {
    const recipeFromState = location.state?.recipe
    const searchContext = location.state?.searchContext

    if (recipeFromState) {
      setRecipe(recipeFromState)
      fetchRecipeDetails(recipeFromState, searchContext)
      return
    }

    // Deep-linked URL: try server cache, then sessionStorage
    const cacheKey = getDetailsCacheKey(id)
    const cachedDetails = getFromCache(cacheKey)
    if (cachedDetails) {
      setRecipe({ id, title: cachedDetails.title || 'Recipe' })
      setRecipeDetails(cachedDetails)
      setIsLoading(false)
      fetchVideos(id, cachedDetails.title, cachedDetails.videoSearchTerms)
      return
    }

    // Try server-side cache via GET
    setIsLoading(true)
    getCachedRecipeDetails(id).then(details => {
      if (details) {
        setRecipe({ id, title: details.title || 'Recipe' })
        setRecipeDetails(details)
        saveToCache(cacheKey, details)
        fetchVideos(id, details.title, details.videoSearchTerms)
      } else {
        navigate('/')
      }
    }).catch(() => navigate('/')).finally(() => setIsLoading(false))
  }, [id, location.state, navigate])

  const fetchVideos = async (recipeId, recipeTitle, videoSearchTerms = []) => {
    const videosCacheKey = `videos-${recipeId}`
    const cachedVideos = getFromCache(videosCacheKey)

    if (cachedVideos) {
      if (import.meta.env.DEV) console.log('✨ Using cached recipe videos')
      setVideos(cachedVideos)
      return
    }

    const result = await getRecipeVideos({ videoSearchTerms, recipeTitle })
    const safeResult = Array.isArray(result) ? result : []
    setVideos(safeResult)
    saveToCache(videosCacheKey, safeResult)
    if (import.meta.env.DEV && safeResult.length > 0) {
      console.log('💾 Saved recipe videos to cache')
    }
  }

  const fetchRecipeDetails = async (recipeData, searchContext) => {
    // Check cache first
    const cacheKey = getDetailsCacheKey(recipeData.id)
    const cachedDetails = getFromCache(cacheKey)
    
    if (cachedDetails) {
      if (import.meta.env.DEV) console.log('✨ Using cached recipe details')
      setRecipeDetails(cachedDetails)
      setIsLoading(false)
      // Fetch videos non-blocking (uses its own cache)
      fetchVideos(recipeData.id, recipeData.title, cachedDetails.videoSearchTerms)
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

      let details;
      const streamBuffer = { current: '' }
      const onChunk = (chunk) => {
        streamBuffer.current += chunk
        try {
          const descMatch = streamBuffer.current.match(/"description"\s*:\s*"((?:[^"\\]|\\.)*)(?:"|$)/)
          if (descMatch) {
            setRecipeDetails(prev => prev ? prev : { description: descMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n') })
            setIsLoading(false)
          }
        } catch { /* partial JSON, keep accumulating */ }
      }
      try {
        details = await getRecipeDetailsStreaming(context, onChunk);
      } catch {
        details = await getRecipeDetails(context);
      }
      setRecipeDetails(details)

      // Save to cache
      saveToCache(cacheKey, details)
      if (import.meta.env.DEV) console.log('💾 Saved recipe details to cache')

      // Fetch videos non-blocking after details resolve
      fetchVideos(recipeData.id, recipeData.title, details.videoSearchTerms)
    } catch (err) {
      console.error('Error fetching recipe details:', err)
      setError(getErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
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
      Math.min(videos.length - 1, prev + 1)
    )
  }

  const toggleInstructions = () => {
    setIsExpanded(!isExpanded)
  }

  // Loading state
  if (isLoading || !recipe) {
    return <RecipeDetailLoading />
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
    videos,
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
            align="stretch"
            gap="10"
            p={{ base: '6', md: '10' }}
            overflow="visible"
          >
            {/* Hero Image */}
            <Image 
              src={fullRecipe.imageUrl}
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

                {/* Navigation Arrows — only shown when real videos are loaded */}
                {videos !== null && videos.length > 0 && (
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
                      disabled={currentVideoIndex >= videos.length - 1}
                    >
                    </Button>
                  </HStack>
                )}
              </Flex>

              {/* Loading state — non-clickable placeholder cards */}
              {videos === null && (
                <Box w="100%" overflowX="hidden" pt="1" mt="-1">
                  <Flex gap="6">
                    {VIDEO_PLACEHOLDERS.map((v) => (
                      <ShortVideo key={v.id} thumbnail={null} />
                    ))}
                  </Flex>
                </Box>
              )}

              {/* Empty state */}
              {videos !== null && videos.length === 0 && (
                <Box
                  py="10"
                  textAlign="center"
                >
                  <Box textStyle="bodyRegular" color="grey.500">
                    Seems like no one cooked this yet 🥲
                  </Box>
                </Box>
              )}

              {/* Real videos carousel */}
              {videos !== null && videos.length > 0 && (
                <>
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
                      {videos.map((video) => (
                        <ShortVideo
                          key={video.id}
                          thumbnail={video.thumbnail}
                          alt={`${fullRecipe.title} video ${video.id}`}
                          onPlay={() => setSelectedVideo(video)}
                        />
                      ))}
                    </Flex>
                  </Box>

                  {/* Carousel Dots */}
                  <Flex justify="center" gap="2">
                    {videos.map((video, index) => (
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
                </>
              )}
            </VStack>

            {/* YouTube Video Modal */}
            <DialogRoot
              open={!!selectedVideo}
              onOpenChange={({ open }) => { if (!open) setSelectedVideo(null) }}
            >
              <DialogBackdrop />
              <DialogPositioner>
                <DialogContent
                  w="360px"
                  h="640px"
                  borderRadius="16px"
                  overflow="hidden"
                  position="relative"
                  bg="black"
                >
                  <DialogCloseTrigger
                    position="absolute"
                    top="3"
                    right="3"
                    zIndex="1"
                    color="white"
                  />
                  {selectedVideo && (
                    <Box
                      as="iframe"
                      src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                      w="100%"
                      h="100%"
                      border="none"
                      allow="autoplay; encrypted-media; fullscreen"
                      allowFullScreen
                    />
                  )}
                </DialogContent>
              </DialogPositioner>
            </DialogRoot>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}

export default RecipeDetail

