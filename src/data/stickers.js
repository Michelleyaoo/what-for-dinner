import appleImg    from '../assets/images/veggie-stickers/new/apple.png'
import avocadoImg  from '../assets/images/veggie-stickers/new/avocado.png'
import eggplantImg from '../assets/images/veggie-stickers/new/eggplant.png'
import orangeImg   from '../assets/images/veggie-stickers/new/orange.png'
import potatoImg   from '../assets/images/veggie-stickers/new/potato.png'
import tomatoImg   from '../assets/images/veggie-stickers/new/tomato.png'

/**
 * Base display sizes (px) for the home-screen stickers.
 * Assets were exported @2x; these are the tuned @1x display widths.
 * AppLoading scales by SPLASH_SCALE; StickerBounce uses size directly.
 */
export const STICKER_ITEMS = [
  { src: appleImg,    size: 110 },
  { src: avocadoImg,  size: 80  },
  { src: eggplantImg, size: 144 },
  { src: orangeImg,   size: 144 },
  { src: potatoImg,   size: 80  },
  { src: tomatoImg,   size: 120 },
]

/** Scale factor applied to STICKER_ITEMS sizes for the splash/opening screen. */
export const SPLASH_SCALE = 1.2
