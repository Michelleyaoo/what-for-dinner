import { useState, useEffect } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

import appleImg    from '../assets/images/veggie-stickers/veggieSticker-apple.png'
import avocadoImg  from '../assets/images/veggie-stickers/veggieSticker-avocado.png'
import cabbageImg  from '../assets/images/veggie-stickers/veggieSticker-cabbage.png'
import eggplantImg from '../assets/images/veggie-stickers/veggieSticker-eggplant.png'
import onionImg    from '../assets/images/veggie-stickers/veggieSticker-onion.png'
import orangeImg   from '../assets/images/veggie-stickers/veggieSticker-orange.png'
import pepperImg   from '../assets/images/veggie-stickers/veggieSticker-pepper.png'
import potatoImg   from '../assets/images/veggie-stickers/veggieSticker-potato.png'
import pumpkinImg  from '../assets/images/veggie-stickers/veggieSticker-pumpkin.png'
import radishImg   from '../assets/images/veggie-stickers/veggieSticker-raddish.png'
import tomatoImg   from '../assets/images/veggie-stickers/veggieSticker-tomato.png'

// Sizes are 1.2× the home page sticker sizes
const STICKERS = [
  { src: appleImg,    size: '120px' },
  { src: avocadoImg,  size: '106px' },
  { src: cabbageImg,  size: '154px' },
  { src: eggplantImg, size: '130px' },
  { src: onionImg,    size: '120px' },
  { src: orangeImg,   size: '120px' },
  { src: pepperImg,   size: '115px' },
  { src: potatoImg,   size: '125px' },
  { src: pumpkinImg,  size: '144px' },
  { src: radishImg,   size: '120px' },
  { src: tomatoImg,   size: '130px' },
]

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
