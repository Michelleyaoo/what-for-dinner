import { useState, useEffect } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

import { STICKER_ITEMS, SPLASH_SCALE } from '../data/stickers'

const STICKERS = STICKER_ITEMS.map(({ src, size }) => ({
  src,
  size: `${Math.round(size * SPLASH_SCALE)}px`,
}))

const COPY         = 'Ready for dinner?'
const TYPING_SPEED = 60    // ms per character
const DISPLAY_DURATION = 3000  // ms before fade begins
const FADE_DURATION    = 0.4   // seconds for fade-out

const MotionBox = motion(Box)

function AppLoading({ onDone }) {
  const [sticker] = useState(() => STICKERS[Math.floor(Math.random() * STICKERS.length)])
  // Random tilt between -5 and 5 degrees, picked once on mount
  const [rotate] = useState(() => Math.round((Math.random() * 10) - 5))
  const [displayText, setDisplayText] = useState('')
  const [visible, setVisible] = useState(true)

  // Type out the copy one character at a time, then stop
  useEffect(() => {
    if (displayText.length >= COPY.length) return
    const timer = setTimeout(
      () => setDisplayText(COPY.slice(0, displayText.length + 1)),
      TYPING_SPEED
    )
    return () => clearTimeout(timer)
  }, [displayText])

  // Fade out after DISPLAY_DURATION
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), DISPLAY_DURATION)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence onExitComplete={onDone}>
        {visible && (
          <MotionBox
            key="app-loading"
            position="fixed"
            inset="0"
            bg="neutral.background"
            backgroundImage="url('/bg.svg')"
            backgroundRepeat="repeat"
            backgroundSize="16px 16px"
            zIndex="9999"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="6"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: FADE_DURATION }}
          >
            <img
              src={sticker.src}
              alt=""
              style={{
                width: sticker.size,
                height: 'auto',
                transform: `rotate(${rotate}deg)`,
                animation: 'sticker-wiggle 0.6s ease infinite',
              }}
            />
            <Text textStyle="headlineMedium" color="primary.600">
              {displayText}
              <Box
                as="span"
                aria-hidden
                ml="1px"
                animation="cursor-blink 1s step-end infinite"
              >
                |
              </Box>
            </Text>
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  )
}

export default AppLoading
