import { Box, VStack, HStack, Flex, Skeleton, SkeletonText, Container } from '@chakra-ui/react'

/**
 * Skeleton loading state for recipe detail page
 */
function RecipeDetailSkeleton() {
  return (
    <Box minH="100vh" w="100%" bg="neutral.background">
      {/* Back Button Skeleton */}
      <Container maxW="1440px" px={{ base: '4', md: '10' }} pt={{ base: '4', md: '12' }}>
        <Skeleton height="40px" width="100px" borderRadius="md" />
      </Container>

      {/* Main Content Card */}
      <Container maxW="800px" px={{ base: '4', md: '10' }} pt={{ base: '0', md: '0' }} pb="10">
        <Box
          bg="white"
          borderTopRadius="xl"
          overflow="hidden"
          mt={{ base: '4', md: '0' }}
        >
          <VStack spacing="10" align="stretch" gap="10" p={{ base: '6', md: '10' }}>
            {/* Hero Image Skeleton */}
            <Skeleton height="320px" borderRadius="lg" />

            {/* Recipe Info Section */}
            <VStack spacing="2" align="stretch" px="4" pb="10" borderBottom="1px solid" borderColor="grey.100">
              {/* Title Skeleton */}
              <SkeletonText noOfLines={2} spacing="3" skeletonHeight="6" />

              {/* Description Skeleton */}
              <Box mt="2">
                <SkeletonText noOfLines={2} spacing="2" skeletonHeight="4" />
              </Box>

              {/* Prep Time Skeleton */}
              <HStack spacing="2" align="center" mt="2">
                <Skeleton height="20px" width="20px" borderRadius="md" />
                <Skeleton height="16px" width="60px" />
              </HStack>

              {/* Ingredient Labels Skeleton */}
              <Flex wrap="wrap" gap="2" align="center" mt="2">
                <Skeleton height="28px" width="90px" borderRadius="sm" />
                <Skeleton height="28px" width="80px" borderRadius="sm" />
                <Skeleton height="28px" width="100px" borderRadius="sm" />
                <Skeleton height="28px" width="70px" borderRadius="sm" />
              </Flex>
            </VStack>

            {/* Instructions Section Skeleton */}
            <VStack spacing="6" align="stretch" pb="10" borderBottom="1px solid" borderColor="grey.100">
              {/* Section Title */}
              <Skeleton height="24px" width="250px" />

              {/* Ingredients Lists */}
              <VStack spacing="4" align="stretch">
                <Box>
                  <Skeleton height="20px" width="200px" mb="2" />
                  <SkeletonText noOfLines={3} spacing="2" skeletonHeight="3" />
                </Box>
                <Box>
                  <Skeleton height="20px" width="250px" mb="2" />
                  <SkeletonText noOfLines={2} spacing="2" skeletonHeight="3" />
                </Box>
                <Box>
                  <Skeleton height="20px" width="220px" mb="2" />
                  <SkeletonText noOfLines={4} spacing="2" skeletonHeight="3" />
                </Box>
              </VStack>

              {/* Steps */}
              <Box>
                <Skeleton height="20px" width="100px" mb="3" />
                <VStack spacing="3" align="stretch">
                  <SkeletonText noOfLines={2} spacing="2" skeletonHeight="3" />
                  <SkeletonText noOfLines={2} spacing="2" skeletonHeight="3" />
                  <SkeletonText noOfLines={3} spacing="2" skeletonHeight="3" />
                </VStack>
              </Box>
            </VStack>

            {/* Video Section Skeleton */}
            <VStack spacing="6" align="stretch">
              <Flex justify="space-between" align="center">
                <Skeleton height="24px" width="250px" />
                <HStack spacing="4">
                  <Skeleton height="40px" width="40px" borderRadius="md" />
                  <Skeleton height="40px" width="40px" borderRadius="md" />
                </HStack>
              </Flex>

              {/* Video Placeholder */}
              <Skeleton height="360px" width="240px" borderRadius="md" />
            </VStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}

export default RecipeDetailSkeleton
