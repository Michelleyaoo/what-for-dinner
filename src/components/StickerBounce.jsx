import { useState } from 'react'

import { STICKER_ITEMS } from '../data/stickers'

/**
 * Randomly picks a veggie sticker on mount and animates it with a
 * continuous wiggle + slight base tilt.
 *
 * Props:
 *   scale — multiplier on the sticker's base size (default 1)
 */
function StickerBounce({ scale = 1.2 }) {
  const [item]   = useState(() => STICKER_ITEMS[Math.floor(Math.random() * STICKER_ITEMS.length)])
  const [rotate] = useState(() => Math.round((Math.random() * 10) - 5))

  return (
    // Base tilt layer — wiggle animates on top without transform conflict
    <div style={{ display: 'inline-block', transform: `rotate(${rotate}deg)` }}>
      <img
        src={item.src}
        alt=""
        draggable={false}
        style={{
          width: `${Math.round(item.size * scale)}px`,
          height: 'auto',
          display: 'block',
          animation: 'sticker-wiggle 0.6s ease infinite',
        }}
      />
    </div>
  )
}

export default StickerBounce
