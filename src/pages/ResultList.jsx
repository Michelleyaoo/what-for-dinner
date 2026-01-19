import { useState, useEffect } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Box, Flex, VStack, Container, Heading, Text } from '@chakra-ui/react'
import Button from '../components/Button'
import Chip from '../components/Chip'
import RecipeCard from '../components/RecipeCard'
import RecipeCardSkeleton from '../components/RecipeCardSkeleton'
import { searchRecipes, getErrorMessage } from '../utils/api'
import { ingredientsFromUrlParam, formatIngredientsForDisplay } from '../utils/ingredients'
import { getSearchCacheKey, saveToCache, getFromCache } from '../utils/recipeCache'

function ResultList() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  
  const [recipes, setRecipes] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [searchContext, setSearchContext] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Get ingredients from URL params
    const ingredientsParam = searchParams.get('ingredients')
    const ingredients = ingredientsFromUrlParam(ingredientsParam)
    
    if (ingredients.length === 0) {
      // No ingredients in URL, redirect to home
      navigate('/')
      return
    }
    
    setSelectedIngredients(formatIngredientsForDisplay(ingredients))
    
    // Check if we have search params from navigation state
    const searchParamsFromState = location.state?.searchParams
    
    if (searchParamsFromState) {
      // Fetch recipes using the search params
      fetchRecipes(searchParamsFromState.ingredients, searchParamsFromState)
    } else {
      // No search params, use ingredients from URL
      fetchRecipes(ingredients)
    }
  }, [location.state, searchParams, navigate])

  const fetchRecipes = async (ingredients, params = {}) => {
    // Check cache first
    const cacheKey = getSearchCacheKey(ingredients)
    const cachedData = getFromCache(cacheKey)
    
    if (cachedData) {
      console.log('✨ Using cached recipe search results')
      setRecipes(cachedData.recipes)
      setTotalResults(cachedData.totalResults)
      setSearchContext(cachedData.searchContext)
      return // Skip API call!
    }

    // If not in cache, fetch from API
    setIsLoading(true)
    setError(null)

    try {
      const searchParams = {
        ingredients,
        maxPrepTime: params.maxPrepTime || 30,
        servings: params.servings || 2,
        dietaryPreferences: params.dietaryPreferences || ['none']
      }

      const data = await searchRecipes(searchParams)

      setRecipes(data.recipes)
      setTotalResults(data.totalResults)
      setSearchContext(searchParams)

      // Save to cache
      saveToCache(cacheKey, {
        recipes: data.recipes,
        totalResults: data.totalResults,
        searchContext: searchParams
      })
      
      console.log('💾 Saved recipe search results to cache')
    } catch (err) {
      console.error('Error fetching recipes:', err)
      setError(getErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/')
  }

  const handleRecipeClick = (recipe) => {
    // Navigate to recipe detail with full context
    navigate(`/recipe/${recipe.id}`, {
      state: {
        recipe,
        searchContext
      }
    })
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
          {/* Loading State - Skeleton Cards */}
          {isLoading && (
            <>
              <Heading
                as="h1"
                textStyle="title2"
                color="neutral.ink"
              >
                Finding delicious recipes...
              </Heading>

              <Box
                display="grid"
                gridTemplateColumns={{
                  base: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  xl: 'repeat(4, 1fr)',
                }}
                gap={{ base: '4', md: '8' }}
              >
                {[...Array(8)].map((_, index) => (
                  <RecipeCardSkeleton key={index} />
                ))}
              </Box>
            </>
          )}

          {/* Error State */}
          {error && !isLoading && (
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
              <Button variant="secondary" onClick={() => navigate('/')}>
                Try Again
              </Button>
            </Box>
          )}

          {/* Results */}
          {!isLoading && !error && recipes.length > 0 && (
            <>
              {/* Title */}
              <Heading
                as="h1"
                textStyle="title2"
                color="neutral.ink"
              >
                {totalResults} {totalResults === 1 ? 'dish' : 'dishes'} you can make
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
                {recipes.map((recipe) => {
                  // Format ingredients with proper states
                  const ingredientsWithStates = [
                    // Matched ingredients - Available (primary color)
                    ...(recipe.matchedIngredients || []).map(ing => ({
                      text: ing,
                      state: 'Available'
                    })),
                    // Additional ingredients - Missing (grey color)
                    ...(recipe.additionalIngredients || []).map(ing => ({
                      text: ing,
                      state: 'Missing'
                    }))
                  ]

                  return (
                    <Box
                      key={recipe.id}
                      onClick={() => handleRecipeClick(recipe)}
                      cursor="pointer"
                    >
                      <RecipeCard
                        id={recipe.id}
                        title={recipe.title}
                        prepTime={recipe.prepTime}
                        ingredients={ingredientsWithStates}
                        image={recipe.image || '1'}
                      />
                    </Box>
                  )
                })}
              </Box>
            </>
          )}

          {/* Empty State */}
          {!isLoading && !error && recipes.length === 0 && (
            <Box textAlign="center" py="20">
              <Text textStyle="title2" color="neutral.ink" mb="2">
                No recipes found
              </Text>
              <Text textStyle="bodyRegular" color="grey.600" mb="6">
                Try different ingredients or adjust your preferences
              </Text>
              <Button variant="primary" onClick={() => navigate('/')}>
                Start Over
              </Button>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  )
}

export default ResultList

