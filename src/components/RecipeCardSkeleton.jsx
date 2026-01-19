import { Box, VStack, HStack, Skeleton, SkeletonText } from '@chakra-ui/react'

/**
 * Skeleton loading state that mirrors RecipeCard layout
 */
function RecipeCardSkeleton() {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="grey.100"
      borderRadius="sm"
      overflow="hidden"
      w="100%"
      display="flex"
      flexDirection="column"
    >
      {/* Recipe Image Skeleton */}
      <Skeleton height="200px" />

      {/* Content */}
      <VStack
        spacing="2"
        align="stretch"
        px="8"
        py="10"
      >
        {/* Title Skeleton */}
        <SkeletonText noOfLines={1} spacing="4" skeletonHeight="5" />

        {/* Time Skeleton */}
        <HStack spacing="2" align="center" mt="2">
          <Skeleton height="20px" width="20px" borderRadius="md" />
          <Skeleton height="16px" width="60px" />
        </HStack>

        {/* Ingredient labels Skeleton */}
        <HStack spacing="2" mt="2" flexWrap="wrap">
          <Skeleton height="26px" width="80px" borderRadius="sm" />
          <Skeleton height="26px" width="70px" borderRadius="sm" />
          <Skeleton height="26px" width="90px" borderRadius="sm" />
        </HStack>
      </VStack>
    </Box>
  )
}

export default RecipeCardSkeleton
