import { useState, useEffect } from 'react'
import { Box, VStack, Text } from '@chakra-ui/react'
import Lottie from 'lottie-react'
import { AnimatePresence, motion } from 'framer-motion'
import rootVegetable from '../assets/animations/veg/root-vegetable.json'

const MESSAGES = [
  'Confirming your ingredients...',
  'Finding delicious recipes...',
  'Almost there...',
]

const MotionBox = motion(Box)

function RecipeSearchLoading() {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => Math.min(prev + 1, MESSAGES.length - 1))
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <VStack
      spacing="10"
      align="center"
      justify="center"
      py={{ base: '20', md: '32' }}
      w="100%"
    >
      {/* Animated food illustration */}
      <MotionBox
        animate={{ y: [0, -14, 0] }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        w={{ base: '130px', md: '160px' }}
        h={{ base: '130px', md: '160px' }}
      >
        <Lottie
          animationData={rootVegetable}
          loop
          style={{ width: '100%', height: '100%' }}
        />
      </MotionBox>

      {/* Cycling progress messages */}
      <AnimatePresence mode="wait">
        <motion.div
          key={messageIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          <Text
            textStyle="bodyRegular"
            color="grey.600"
            textAlign="center"
          >
            {MESSAGES[messageIndex]}
          </Text>
        </motion.div>
      </AnimatePresence>
    </VStack>
  )
}

export default RecipeSearchLoading
