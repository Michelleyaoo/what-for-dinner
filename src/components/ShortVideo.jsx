import { Box, Flex, Skeleton } from '@chakra-ui/react'
import { Play } from 'phosphor-react'

function ShortVideo({ 
  thumbnail,
  onPlay,
  alt = 'Recipe video',
  ...props 
}) {
  return (
    <Box
      w="240px"
      h="427px"
      flexShrink={0}
      position="relative"
      borderRadius="16px"
      overflow="hidden"
      cursor="pointer"
      transition="all 0.2s ease"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'card',
      }}
      onClick={onPlay}
      {...props}
    >
      {thumbnail ? (
        <Box
          as="img"
          src={thumbnail}
          alt={alt}
          position="absolute"
          inset="0"
          w="100%"
          h="100%"
          objectFit="cover"
          objectPosition="center"
          pointerEvents="none"
        />
      ) : (
        <Skeleton
          position="absolute"
          inset="0"
          w="100%"
          h="100%"
          borderRadius="0"
        />
      )}

      {/* Scrim */}
      <Box
        position="absolute"
        inset="0"
        bg="rgba(0, 0, 0, 0.5)"
        pointerEvents="none"
      />

      {/* Play icon */}
      <Flex
        position="absolute"
        inset="0"
        align="center"
        justify="center"
        pointerEvents="none"
      >
        <Box as={Play} size={40} color="#ffffff" weight="fill" />
      </Flex>
    </Box>
  )
}

export default ShortVideo

