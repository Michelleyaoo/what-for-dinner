import Button from './Button'
import { Heart, ShoppingCart, ArrowLeft, Plus } from 'phosphor-react'

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Button label text',
    },
    variant: {
      control: 'select',
      options: ['primary', 'tertiary'],
      description: 'Button style variant',
    },
    icon: {
      control: 'boolean',
      description: 'Whether to show an icon',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
}

export const Primary = {
  args: {
    children: 'Back',
    variant: 'primary',
    icon: true,
  },
}

export const PrimaryNoIcon = {
  args: {
    children: 'Continue',
    variant: 'primary',
    icon: false,
  },
}

export const Tertiary = {
  args: {
    children: 'Back to search',
    variant: 'tertiary',
    icon: true,
  },
}

export const TertiaryNoIcon = {
  args: {
    children: 'Learn more',
    variant: 'tertiary',
    icon: false,
  },
}

export const Disabled = {
  args: {
    children: 'Disabled button',
    variant: 'primary',
    icon: true,
    disabled: true,
  },
}

export const WithCustomIcon = {
  args: {
    children: 'Add to cart',
    variant: 'primary',
    icon: true,
    iconElement: <ShoppingCart size={20} weight="regular" />,
  },
}

export const HeartIcon = {
  args: {
    children: 'Favorite',
    variant: 'primary',
    icon: true,
    iconElement: <Heart size={20} weight="regular" />,
  },
}

export const PlusIcon = {
  args: {
    children: 'Add new',
    variant: 'tertiary',
    icon: true,
    iconElement: <Plus size={20} weight="bold" />,
  },
}
