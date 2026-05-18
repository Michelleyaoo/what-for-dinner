import { Box } from '@chakra-ui/react'
import { useState, useCallback } from 'react'

import tomatoImg   from '../assets/images/veggie-stickers/veggieSticker-tomato.png'
import onionImg    from '../assets/images/veggie-stickers/veggieSticker-onion.png'
import eggplantImg from '../assets/images/veggie-stickers/veggieSticker-eggplant.png'
import avocadoImg  from '../assets/images/veggie-stickers/veggieSticker-avocado.png'
import cabbageImg  from '../assets/images/veggie-stickers/veggieSticker-cabbage.png'
import appleImg    from '../assets/images/veggie-stickers/veggieSticker-apple.png'
import radishImg   from '../assets/images/veggie-stickers/veggieSticker-raddish.png'

const STICKER_SIZE = '108px'
const WIGGLE_ANIMATION = 'sticker-wiggle 0.5s ease'

const STICKERS = [
  { src: tomatoImg,   top: '8%',     left: '8%',    rotate: -15 },
  { src: onionImg,    top: '15%',     right: '18%',   rotate: 12, size: '120px' },
  { src: eggplantImg, top: '38%',    left: '13%',   rotate: 10, size: '120px' },
  { src: avocadoImg,  top: '35%',    right: '10%',  rotate: -8  },
  { src: cabbageImg,  bottom: '10%', left: '7%',    rotate: 12,  size: '128px' },
  { src: appleImg,    bottom: '25%',  left: '75%',   rotate: -10, size: '128px' },
  { src: radishImg,   bottom: '5%',  right: '5%',   rotate: 16, size: '128px'  },
]

function Sticker({ src, top, left, right, bottom, rotate: baseRotate, size }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOrigin, setDragOrigin] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handlePointerDown = useCallback((e) => {
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    setIsDragging(true)
    setIsHovering(false)
    setDragOrigin({ x: e.clientX - offset.x, y: e.clientY - offset.y })
  }, [offset])

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return
    setOffset({ x: e.clientX - dragOrigin.x, y: e.clientY - dragOrigin.y })
  }, [isDragging, dragOrigin])

  const handlePointerUp = useCallback((e) => {
    setIsDragging(false)
    // Re-check hover after drag ends
    setIsHovering(e.currentTarget.matches(':hover'))
  }, [])

  return (
    // Layer 1 — position + drag translate
    <div
      style={{
        position: 'absolute',
        top, left, right, bottom,
        pointerEvents: 'all',
        userSelect: 'none',
        display: 'inline-block',
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Layer 2 — base rotation. Static; never animated. */}
      <div style={{ display: 'inline-block', transform: `rotate(${baseRotate}deg)` }}>
        {/*
          Layer 3 — wiggle. No competing static transform.
          Global @keyframes means the animation name is always available.
          Mouse events live here so they fire over the visible image area.
        */}
        <div
          style={{
            display: 'inline-block',
            cursor: isDragging ? 'grabbing' : 'grab',
            animation: isHovering && !isDragging ? WIGGLE_ANIMATION : 'none',
          }}
          onMouseEnter={() => setIsHovering(true)}
          onAnimationEnd={() => setIsHovering(false)}
        >
          <img
            src={src}
            alt=""
            draggable={false}
            style={{ width: STICKER_SIZE, height: 'auto', display: 'block' }}
          />
        </div>
      </div>
    </div>
  )
}

function VeggieStickers() {
  return (
    <>
      {/* Hidden on mobile — stickers overlap content on narrow viewports */}
      <Box
        display={{ base: 'none', md: 'block' }}
        position="fixed"
        inset="0"
        pointerEvents="none"
        zIndex="1"
        overflow="hidden"
      >
        {STICKERS.map((sticker, i) => (
          <Sticker key={i} {...sticker} />
        ))}
      </Box>
    </>
  )
}

export default VeggieStickers
