import { useState } from 'react'

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

const STICKERS = [
  appleImg, avocadoImg, cabbageImg, eggplantImg, onionImg,
  orangeImg, pepperImg, potatoImg, pumpkinImg, radishImg, tomatoImg,
]

/**
 * Randomly picks a veggie sticker on mount and animates it with a
 * continuous wiggle + slight base tilt.
 *
 * Props:
 *   size  — image width (default '160px')
 */
function StickerBounce({ size = '160px' }) {
  const [src]    = useState(() => STICKERS[Math.floor(Math.random() * STICKERS.length)])
  const [rotate] = useState(() => Math.round((Math.random() * 10) - 5))

  return (
    // Base tilt layer — wiggle animates on top without transform conflict
    <div style={{ display: 'inline-block', transform: `rotate(${rotate}deg)` }}>
      <img
        src={src}
        alt=""
        draggable={false}
        style={{
          width: size,
          height: 'auto',
          display: 'block',
          animation: 'sticker-wiggle 0.6s ease infinite',
        }}
      />
    </div>
  )
}

export default StickerBounce
