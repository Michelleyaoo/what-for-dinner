import { Box } from '@chakra-ui/react'

function ShortVideo({ 
  thumbnail,
  link = '#',
  alt = 'Recipe video',
  ...props 
}) {
  const handleClick = () => {
    if (link && link !== '#') {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

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
      onClick={handleClick}
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
        <Box
          position="absolute"
          inset="0"
          bg="grey.100"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            textStyle="subheadRegular"
            color="grey.500"
          >
            Video placeholder
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default ShortVideo

