import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Box, Flex, VStack, Container, Heading, Text } from '@chakra-ui/react'
import Button from '../components/Button'
import IngredientSearch from '../components/IngredientSearch'
import RecipeCard from '../components/RecipeCard'
import RecipeCardSkeleton from '../components/RecipeCardSkeleton'
import RecipeSearchLoading from '../components/RecipeSearchLoading'
import { searchRecipes, getRecipeDetails, getRecipeImages, getErrorMessage } from '../utils/api'
import { ingredientsFromUrlParam, ingredientsToUrlParam, removeEmojiFromIngredient, formatIngredientsForDisplay } from '../utils/ingredients'
import { getSearchCacheKey, getDetailsCacheKey, saveToCache, getFromCache } from '../utils/recipeCache'

function ResultList() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  
  const [recipes, setRecipes] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [searchedIngredients, setSearchedIngredients] = useState([])
  const [searchContext, setSearchContext] = useState(null)
  const [recipeImages, setRecipeImages] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const isFetchingRef = useRef(false)

  const ingredientsChanged =
    selectedIngredients.length !== searchedIngredients.length ||
    selectedIngredients.some((ing) => !searchedIngredients.includes(ing))

  useEffect(() => {
    const ingredientsParam = searchParams.get('ingredients')
    const ingredients = ingredientsFromUrlParam(ingredientsParam)
    
    if (ingredients.length === 0) {
      navigate('/')
      return
    }

    const displayed = formatIngredientsForDisplay(ingredients)
    setSelectedIngredients(displayed)
    setSearchedIngredients(displayed)
    
    const searchParamsFromState = location.state?.searchParams
    
    if (searchParamsFromState) {
      fetchRecipes(searchParamsFromState.ingredients, searchParamsFromState)
    } else {
      fetchRecipes(ingredients)
    }
  }, [location.state, searchParams, navigate])

  const fetchImagesInBackground = (recipes) => {
    const recipesNeedingImages = recipes.filter(r => r.title)
    if (import.meta.env.DEV) console.log('🖼️ Fetching images for', recipesNeedingImages.length, 'recipes')
    if (recipesNeedingImages.length === 0) return

    getRecipeImages(
      recipesNeedingImages.map(r => ({ id: r.id, title: r.title, imageSearchKeywords: r.imageSearchKeywords }))
    ).then(({ images }) => {
      if (import.meta.env.DEV) console.log('🖼️ Images received:', images)
      setRecipeImages(prev => ({ ...prev, ...images }))
    }).catch((err) => { if (import.meta.env.DEV) console.error('🖼️ Image fetch error:', err) })
  }

  const prefetchTopRecipeDetails = (recipes, context) => {
    recipes.slice(0, 2).forEach(recipe => {
      const cacheKey = getDetailsCacheKey(recipe.id)
      if (getFromCache(cacheKey)) return

      getRecipeDetails({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        ingredients: context.ingredients,
        matchedIngredients: recipe.matchedIngredients || [],
        additionalIngredients: recipe.additionalIngredients || [],
        servings: context.servings || 2,
        maxPrepTime: context.maxPrepTime
      }).then(details => {
        saveToCache(cacheKey, details)
      }).catch(() => {})
    })
  }

  const fetchRecipes = async (ingredients, params = {}) => {
    if (isFetchingRef.current) return
    isFetchingRef.current = true

    const cacheKey = getSearchCacheKey(ingredients)
    const cachedData = getFromCache(cacheKey)
    
    if (cachedData) {
      setRecipes(cachedData.recipes)
      setTotalResults(cachedData.totalResults)
      setSearchContext(cachedData.searchContext)
      fetchImagesInBackground(cachedData.recipes)
      isFetchingRef.current = false
      return
    }

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

      saveToCache(cacheKey, {
        recipes: data.recipes,
        totalResults: data.totalResults,
        searchContext: searchParams
      })

      fetchImagesInBackground(data.recipes)
      prefetchTopRecipeDetails(data.recipes, searchParams)
    } catch (err) {
      console.error('Error fetching recipes:', err)
      setError(getErrorMessage(err))
    } finally {
      setIsLoading(false)
      isFetchingRef.current = false
    }
  }

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    )
  }

  const handleUpdateSearch = () => {
    if (selectedIngredients.length === 0) return

    const cleanIngredients = selectedIngredients.map(removeEmojiFromIngredient)
    const ingredientsParam = ingredientsToUrlParam(cleanIngredients)

    setSearchedIngredients([...selectedIngredients])

    navigate(`/results?ingredients=${ingredientsParam}`, {
      replace: true,
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

  const handleBack = () => {
    navigate('/')
  }

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${recipe.id}`, {
      state: {
        recipe: { ...recipe, imageUrl: recipeImages[recipe.id] || recipe.imageUrl },
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

          {/* Ingredient Search */}
          <Box
            flex={{ base: '0', md: '1' }}
            maxW={{ base: '100%', md: '45rem' }}
          >
            <IngredientSearch
              selectedIngredients={selectedIngredients}
              onToggleIngredient={toggleIngredient}
            />
          </Box>

          {/* Update results button — visible when ingredients have changed */}
          <Box
            w={{ base: 'auto', md: '30' }}
            display="flex"
            alignItems="center"
            justifyContent={{ base: 'stretch', md: 'flex-start' }}
          >
            {ingredientsChanged && selectedIngredients.length > 0 ? (
              <Button
                variant="primary"
                icon={false}
                onClick={handleUpdateSearch}
                w={{ base: '100%', md: 'auto' }}
                whiteSpace="nowrap"
              >
                Update results
              </Button>
            ) : (
              <Box
                w="30"
                visibility="hidden"
                display={{ base: 'none', md: 'block' }}
              />
            )}
          </Box>
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
          {/* Loading State */}
          {isLoading && <RecipeSearchLoading />}

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
                  const ingredientsWithStates = [
                    ...(recipe.matchedIngredients || []).map(ing => ({
                      text: ing,
                      state: 'Available'
                    })),
                    ...(recipe.additionalIngredients || []).map(ing => ({
                      text: ing,
                      state: 'Missing'
                    }))
                  ]

                  return (
                    <RecipeCard
                      key={recipe.id}
                      title={recipe.title}
                      prepTime={recipe.prepTime}
                      ingredients={ingredientsWithStates}
                      image={recipe.image || '1'}
                      imageUrl={recipeImages[recipe.id] || recipe.imageUrl}
                      onClick={() => handleRecipeClick(recipe)}
                    />
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

