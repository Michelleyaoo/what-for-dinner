const ALL_INGREDIENTS = [
  // Vegetables
  { name: 'Cabbage', emoji: '🥬' },
  { name: 'Tomato', emoji: '🍅' },
  { name: 'Potato', emoji: '🥔' },
  { name: 'Carrot', emoji: '🥕' },
  { name: 'Onion', emoji: '🧅' },
  { name: 'Broccoli', emoji: '🥦' },
  { name: 'Garlic', emoji: '🧄' },
  { name: 'Pepper', emoji: '🌶️' },
  { name: 'Mushroom', emoji: '🍄' },
  { name: 'Corn', emoji: '🌽' },
  { name: 'Eggplant', emoji: '🍆' },
  { name: 'Lettuce', emoji: '🥬' },
  { name: 'Cucumber', emoji: '🥒' },
  { name: 'Avocado', emoji: '🥑' },
  { name: 'Spinach', emoji: '🥬' },
  { name: 'Cauliflower', emoji: '🥦' },
  { name: 'Celery', emoji: '🥬' },
  { name: 'Zucchini', emoji: '🥒' },
  { name: 'Sweet Potato', emoji: '🍠' },
  { name: 'Green Bean', emoji: '🫛' },
  { name: 'Asparagus', emoji: '🌿' },
  { name: 'Bell Pepper', emoji: '🫑' },
  { name: 'Pumpkin', emoji: '🎃' },
  { name: 'Radish', emoji: '🥕' },
  { name: 'Beet', emoji: '🟣' },
  { name: 'Kale', emoji: '🥬' },
  { name: 'Peas', emoji: '🫛' },

  // Proteins
  { name: 'Egg', emoji: '🥚' },
  { name: 'Beef', emoji: '🥩' },
  { name: 'Chicken', emoji: '🍗' },
  { name: 'Tofu', emoji: '🫘' },
  { name: 'Pork', emoji: '🥓' },
  { name: 'Fish', emoji: '🐟' },
  { name: 'Shrimp', emoji: '🦐' },
  { name: 'Salmon', emoji: '🐟' },
  { name: 'Tuna', emoji: '🐟' },
  { name: 'Turkey', emoji: '🦃' },
  { name: 'Lamb', emoji: '🍖' },
  { name: 'Sausage', emoji: '🌭' },
  { name: 'Bacon', emoji: '🥓' },

  // Dairy & Cheese
  { name: 'Cheese', emoji: '🧀' },
  { name: 'Butter', emoji: '🧈' },
  { name: 'Milk', emoji: '🥛' },
  { name: 'Cream', emoji: '🥛' },
  { name: 'Yogurt', emoji: '🥛' },

  // Grains & Starches
  { name: 'Pasta', emoji: '🍝' },
  { name: 'Rice', emoji: '🍚' },
  { name: 'Bread', emoji: '🍞' },
  { name: 'Noodles', emoji: '🍜' },
  { name: 'Flour', emoji: '🌾' },
  { name: 'Oats', emoji: '🌾' },
  { name: 'Quinoa', emoji: '🌾' },
  { name: 'Tortilla', emoji: '🫓' },
  { name: 'Couscous', emoji: '🌾' },

  // Fruits
  { name: 'Lemon', emoji: '🍋' },
  { name: 'Lime', emoji: '🍋' },
  { name: 'Apple', emoji: '🍎' },
  { name: 'Banana', emoji: '🍌' },
  { name: 'Orange', emoji: '🍊' },
  { name: 'Coconut', emoji: '🥥' },
  { name: 'Mango', emoji: '🥭' },
  { name: 'Pineapple', emoji: '🍍' },

  // Pantry & Condiments
  { name: 'Soy Sauce', emoji: '🫗' },
  { name: 'Olive Oil', emoji: '🫒' },
  { name: 'Vinegar', emoji: '🫗' },
  { name: 'Honey', emoji: '🍯' },
  { name: 'Ginger', emoji: '🫚' },
  { name: 'Chili', emoji: '🌶️' },
  { name: 'Cinnamon', emoji: '🫙' },
  { name: 'Cumin', emoji: '🫙' },

  // Nuts & Legumes
  { name: 'Peanut', emoji: '🥜' },
  { name: 'Almond', emoji: '🌰' },
  { name: 'Chickpea', emoji: '🫘' },
  { name: 'Lentil', emoji: '🫘' },
  { name: 'Black Bean', emoji: '🫘' },
  { name: 'Kidney Bean', emoji: '🫘' },
]

export const POPULAR_INGREDIENTS = [
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

export const INGREDIENT_EMOJI_MAP = Object.fromEntries(
  ALL_INGREDIENTS.flatMap(({ name, emoji }) => {
    const lower = name.toLowerCase()
    const entries = [[lower, emoji]]
    if (lower === 'egg') entries.push(['eggs', emoji])
    return entries
  })
)

export default ALL_INGREDIENTS
