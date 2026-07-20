import { useState, useEffect } from 'react'
import { VStack, Text } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import StickerBounce from './StickerBounce'

const MESSAGES = [
  'Confirming your ingredients...',
  'Finding delicious recipes...',
  'Almost there...',
]

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
      gap="6"
      align="center"
      justify="center"
      py={{ base: '20', md: '32' }}
      w="100%"
    >
      <StickerBounce />

      <AnimatePresence mode="wait">
        <motion.div
          key={messageIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          <Text
            textStyle="headlineMedium"
            color="primary.600"
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
