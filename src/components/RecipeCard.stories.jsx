import RecipeCard from './RecipeCard'

export default {
  title: 'Components/RecipeCard',
  component: RecipeCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'Recipe title',
    },
    prepTime: {
      control: 'text',
      description: 'Preparation time',
    },
    image: {
      control: 'select',
      options: ['1', '2', '3'],
      description: 'Image variant',
    },
  },
}

export const Default = {
  args: {
    title: 'Tomato and egg stir fry',
    prepTime: '20 mins',
    ingredients: [
      { text: '🍅 Tomato', state: 'Available' },
      { text: '🥚 Egg', state: 'Available' },
      { text: '🧅 Onion', state: 'Available' },
    ],
    image: '1',
  },
}

export const SomeUnavailableIngredients = {
  args: {
    title: 'Cozy beef stew',
    prepTime: '2 hours',
    ingredients: [
      { text: '🥩 Beef', state: 'Available' },
      { text: '🥕 Carrot', state: 'Available' },
      { text: '🥔 Potato', state: 'Available' },
      { text: '🍷 Red wine', state: 'Not Available' },
    ],
    image: '2',
  },
}

export const ManyIngredients = {
  args: {
    title: 'Thai red curry',
    prepTime: '45 mins',
    ingredients: [
      { text: '🍗 Chicken', state: 'Available' },
      { text: '🥥 Coconut milk', state: 'Available' },
      { text: '🌶️ Red curry paste', state: 'Not Available' },
      { text: '🫑 Bell pepper', state: 'Available' },
      { text: '🧅 Onion', state: 'Available' },
      { text: '🧄 Garlic', state: 'Available' },
    ],
    image: '3',
  },
}

export const StringIngredients = {
  args: {
    title: 'Simple pasta',
    prepTime: '15 mins',
    ingredients: ['Pasta', 'Tomato sauce', 'Parmesan'],
    image: '1',
  },
  parameters: {
    docs: {
      description: {
        story: 'RecipeCard normalizes string arrays to object format with default "Available" state',
      },
    },
  },
}

export const QuickRecipe = {
  args: {
    title: 'Avocado toast',
    prepTime: '5 mins',
    ingredients: [
      { text: '🥑 Avocado', state: 'Available' },
      { text: '🍞 Bread', state: 'Available' },
    ],
    image: '1',
  },
}

export const InGrid = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '24px',
      maxWidth: '1200px',
    }}>
      <RecipeCard
        title="Tomato and egg stir fry"
        prepTime="20 mins"
        ingredients={[
          { text: '🍅 Tomato', state: 'Available' },
          { text: '🥚 Egg', state: 'Available' },
        ]}
        image="1"
      />
      <RecipeCard
        title="Cozy beef stew"
        prepTime="2 hours"
        ingredients={[
          { text: '🥩 Beef', state: 'Available' },
          { text: '🥕 Carrot', state: 'Not Available' },
        ]}
        image="2"
      />
      <RecipeCard
        title="Thai red curry"
        prepTime="45 mins"
        ingredients={[
          { text: '🍗 Chicken', state: 'Available' },
          { text: '🥥 Coconut milk', state: 'Available' },
        ]}
        image="3"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Recipe cards in a responsive grid layout',
      },
    },
  },
}
