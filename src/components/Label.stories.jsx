import Label from './Label'

export default {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Label text (can include emoji)',
    },
    state: {
      control: 'select',
      options: ['Available', 'Not Available'],
      description: 'Availability state - changes color scheme',
    },
  },
}

export const Available = {
  args: {
    text: '🍅 Tomato',
    state: 'Available',
  },
}

export const NotAvailable = {
  args: {
    text: '🥑 Avocado',
    state: 'Not Available',
  },
}

export const TextOnly = {
  args: {
    text: 'Chicken',
    state: 'Available',
  },
}

export const MultipleFoodItems = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Label text="🍅 Tomato" state="Available" />
      <Label text="🥚 Egg" state="Available" />
      <Label text="🧅 Onion" state="Available" />
      <Label text="🥑 Avocado" state="Not Available" />
      <Label text="🧀 Cheese" state="Not Available" />
      <Label text="🌶️ Chili" state="Available" />
    </div>
  ),
}
