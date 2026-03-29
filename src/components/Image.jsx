import { useState } from 'react'
import { Box } from '@chakra-ui/react'

function ImagePlaceholder({ h, props }) {
  return (
    <Box
      w="100%"
      h={h || "240px"}
      minH={h || "240px"}
      position="relative"
      overflow="hidden"
      flexShrink={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      aria-hidden="true"
      style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 40%, #fcd34d 70%, #f9a825 100%)'
      }}
      {...props}
    >
      <Box
        fontSize="48px"
        opacity={0.45}
        userSelect="none"
      >
        🍽️
      </Box>
    </Box>
  )
}

function Image({ image = "1", src, alt = "", ...props }) {
  const [imgError, setImgError] = useState(false)

  // If src is provided (and hasn't errored), render the real photo
  if (src && !imgError) {
    return (
      <Box
        w="100%"
        h="240px"
        position="relative"
        overflow="hidden"
        {...props}
      >
        <Box
          as="img"
          src={src}
          alt={alt}
          position="absolute"
          inset="0"
          w="100%"
          h="100%"
          objectFit="cover"
          objectPosition="center"
          pointerEvents="none"
          onError={() => setImgError(true)}
        />
      </Box>
    )
  }

  // Fallback: gradient placeholder
  return <ImagePlaceholder h={props.h} props={props} />
}

export default Image
