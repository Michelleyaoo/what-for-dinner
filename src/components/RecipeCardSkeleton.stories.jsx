import RecipeCardSkeleton from './RecipeCardSkeleton'

export default {
  title: 'Components/RecipeCardSkeleton',
  component: RecipeCardSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export const Single = {
  render: () => (
    <div style={{ width: '400px' }}>
      <RecipeCardSkeleton />
    </div>
  ),
}

export const InGrid = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '24px',
      maxWidth: '1200px',
    }}>
      <RecipeCardSkeleton />
      <RecipeCardSkeleton />
      <RecipeCardSkeleton />
      <RecipeCardSkeleton />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Loading state shown while fetching recipes',
      },
    },
  },
}
