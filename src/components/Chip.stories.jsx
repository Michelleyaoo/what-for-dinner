import { useState } from 'react'
import Chip from './Chip'

export default {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Chip label text',
    },
    isSelected: {
      control: 'boolean',
      description: 'Whether the chip is in selected state',
    },
    size: {
      control: 'select',
      options: ['Small', 'Big'],
      description: 'Chip size variant',
    },
  },
}

export const Default = {
  args: {
    text: 'Chicken',
    isSelected: false,
    size: 'Big',
  },
}

export const Selected = {
  args: {
    text: 'Chicken',
    isSelected: true,
    size: 'Big',
  },
}

export const SmallSize = {
  args: {
    text: 'Beef',
    isSelected: false,
    size: 'Small',
  },
}

export const SmallSelected = {
  args: {
    text: 'Beef',
    isSelected: true,
    size: 'Small',
  },
}

export const Interactive = {
  render: (args) => {
    const [selected, setSelected] = useState(false)
    
    return (
      <Chip
        {...args}
        isSelected={selected}
        onClick={() => setSelected(!selected)}
      />
    )
  },
  args: {
    text: 'Click to toggle',
    size: 'Big',
  },
}

export const MultipleChips = {
  render: () => {
    const [selectedChips, setSelectedChips] = useState(['Chicken'])
    
    const ingredients = ['Chicken', 'Beef', 'Pork', 'Tofu', 'Seafood']
    
    const toggleChip = (ingredient) => {
      setSelectedChips(prev =>
        prev.includes(ingredient)
          ? prev.filter(i => i !== ingredient)
          : [...prev, ingredient]
      )
    }
    
    return (
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {ingredients.map(ingredient => (
          <Chip
            key={ingredient}
            text={ingredient}
            isSelected={selectedChips.includes(ingredient)}
            onClick={() => toggleChip(ingredient)}
            size="Big"
          />
        ))}
      </div>
    )
  },
}
