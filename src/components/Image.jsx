import { Box } from '@chakra-ui/react'

// Import images from assets folder
// STEP 1: Add your image files to src/assets/images/ with these names:
//   - tomato-egg-stir-fry.png
//   - cozy-beef-stew.png
//   - beef-stew-overlay.png
//   - thai-red-curry.png
//
// STEP 2: Uncomment the imports below and update the imageUrls object

// import tomatoEggImage from '../assets/images/tomato-egg-stir-fry.png'
// import beefStewImage from '../assets/images/cozy-beef-stew.png'
// import beefStewOverlay from '../assets/images/beef-stew-overlay.png'
// import thaiCurryImage from '../assets/images/thai-red-curry.png'

// Image URLs - update once imports are uncommented above
const imageUrls = {
  1: null, // tomatoEggImage
  2: {
    primary: null, // beefStewImage
    overlay: null  // beefStewOverlay
  },
  3: null // thaiCurryImage
}

// Once images are imported, update imageUrls to:
// const imageUrls = {
//   1: tomatoEggImage,
//   2: {
//     primary: beefStewImage,
//     overlay: beefStewOverlay
//   },
//   3: thaiCurryImage
// }

function Image({ image = "1", src, alt = "", ...props }) {
  // If src is provided, use it directly
  if (src) {
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
        />
      </Box>
    )
  }

  // Use image variant from design - ensure it's a string
  const imageVariant = String(image)

  // Image variant 2 has layered images
  if (imageVariant === "2") {
    const images = imageUrls[2]
    
    // Show placeholder if images not loaded yet
    if (!images || !images.primary || !images.overlay) {
      return (
        <Box
          w="100%"
          h="240px"
          minH="240px"
          bg="grey.100"
          border="1px solid"
          borderColor="grey.200"
          position="relative"
          overflow="hidden"
          flexShrink={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          aria-hidden="true"
          {...props}
        >
          <Box
            textStyle="subheadRegular"
            color="grey.400"
          >
            Image placeholder
          </Box>
        </Box>
      )
    }
    
    return (
      <Box
        w="100%"
        h="240px"
        position="relative"
        overflow="hidden"
        aria-hidden="true"
        {...props}
      >
        <Box
          as="img"
          src={images.primary}
          alt=""
          position="absolute"
          inset="0"
          w="100%"
          h="100%"
          objectFit="cover"
          objectPosition="center"
          pointerEvents="none"
        />
        <Box
          as="img"
          src={images.overlay}
          alt=""
          position="absolute"
          inset="0"
          w="100%"
          h="100%"
          objectFit="cover"
          objectPosition="center"
          pointerEvents="none"
        />
      </Box>
    )
  }

  // Image variants 1 and 3 use single images
  const imageUrl = imageUrls[imageVariant] || imageUrls["1"]
  
  // Show placeholder if image not loaded yet
  if (!imageUrl) {
    return (
      <Box
        w="100%"
        h="240px"
        minH="240px"
        bg="grey.100"
        border="1px solid"
        borderColor="grey.200"
        position="relative"
        overflow="hidden"
        flexShrink={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        {...props}
      >
        <Box
          textStyle="subheadRegular"
          color="grey.400"
        >
          Image placeholder
        </Box>
      </Box>
    )
  }

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
        src={imageUrl}
        alt={alt}
        position="absolute"
        inset="0"
        w="100%"
        h="100%"
        objectFit="cover"
        objectPosition="center"
        pointerEvents="none"
      />
    </Box>
  )
}

export default Image
