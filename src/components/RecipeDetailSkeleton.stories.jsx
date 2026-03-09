import RecipeDetailSkeleton from './RecipeDetailSkeleton'

export default {
  title: 'Components/RecipeDetailSkeleton',
  component: RecipeDetailSkeleton,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export const Default = {
  render: () => <RecipeDetailSkeleton />,
  parameters: {
    docs: {
      description: {
        story: 'Full-page loading state for recipe detail view',
      },
    },
  },
}
