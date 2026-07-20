import { Box } from '@chakra-ui/react'
import { useState, useCallback } from 'react'

import { STICKER_ITEMS } from '../data/stickers'

const WIGGLE_ANIMATION = 'sticker-wiggle 0.5s ease'

// Positions derived from Figma frame (1440×784px) — converted to %.
// Order matches STICKER_ITEMS: apple, avocado, eggplant, orange, potato, tomato.
const STICKER_LAYOUT = [
  { top: '10%',    left: '15%',  rotate: -12 },
  { top: '44%',    left: '8%',   rotate: -5  },
  { bottom: '3%',  left: '17%',  rotate: -20 },
  { top: '29%',    right: '6%',  rotate: 17  },
  { top: '15%',    right: '21%', rotate: 10  },
  { bottom: '19%', right: '11%', rotate: -10 },
]

const STICKERS = STICKER_ITEMS.map(({ src, size }, i) => ({
  src,
  size: `${size}px`,
  ...STICKER_LAYOUT[i],
}))

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
            style={{ width: size, height: 'auto', display: 'block' }}
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
