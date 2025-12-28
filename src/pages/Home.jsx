import { useState } from 'react'
import Chip from '../components/Chip'
import './Home.css'

const INGREDIENTS = [
  '🥬 Cabbage',
  '🍅 Tomato',
  '🥔 Potato',
  '🥕 Carrot',
  '🧅 Onion',
  '🥦 Broccoli',
  '🥚 Egg',
  '🥩 Beef',
  '🍗 Chicken',
  '🫘 Tofu',
]

function Home() {
  const [selectedIngredients, setSelectedIngredients] = useState([])

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    )
  }

  return (
    <div className="home">
      <div className="home__container">
        <h1 className="home__title">🥘 What for dinner?</h1>

        <div className="home__input-section">
          <input
            type="text"
            className="home__input"
            placeholder="what I have in the fridge..."
            value={selectedIngredients.join(', ')}
            readOnly
          />

          <div className="home__chips">
            {INGREDIENTS.map((ingredient) => (
              <Chip
                key={ingredient}
                text={ingredient}
                onClick={() => toggleIngredient(ingredient)}
                isSelected={selectedIngredients.includes(ingredient)}
              />
            ))}
          </div>
        </div>

        <button className="home__button">Let's cook!</button>
      </div>
    </div>
  )
}

export default Home

