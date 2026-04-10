import { useState, useEffect } from 'react'
import { Box, VStack, Text, Container } from '@chakra-ui/react'
import Lottie from 'lottie-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import cookingAnimation from '../assets/animations/food/cooking.json'

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
          spacing="6"
          align="center"
          justify="center"
          minH="80vh"
        >
          <Box w={{ base: '200px', md: '240px' }} h={{ base: '200px', md: '240px' }}>
            <Lottie
              animationData={cookingAnimation}
              loop
              style={{ width: '100%', height: '100%' }}
            />
          </Box>

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
      </Container>
    </Box>
  )
}

export default RecipeDetailLoading
