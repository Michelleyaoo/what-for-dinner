import { useState, useEffect } from 'react'
import { Box, VStack, Text, Container } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import StickerBounce from './StickerBounce'

const MESSAGES = [
  'Looking into recipe details...',
  'Searching for related tutorials...',
  'One second...',
]

function RecipeDetailLoading() {
  const navigate = useNavigate()
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => Math.min(prev + 1, MESSAGES.length - 1))
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box minH="100vh" w="100%" bg="neutral.background">
      {/* Back Button */}
      <Container maxW="1440px" px={{ base: '4', md: '10' }} pt={{ base: '4', md: '12' }}>
        <Button variant="tertiary" icon={true} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Container>

      <Container maxW="800px" px={{ base: '4', md: '10' }}>
        <VStack
          gap="6"
          align="center"
          justify="center"
          minH="80vh"
        >
          <StickerBounce size="150px" />

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
      </Container>
    </Box>
  )
}

export default RecipeDetailLoading
