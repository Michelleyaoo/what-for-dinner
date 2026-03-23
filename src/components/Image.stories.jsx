import Image from './Image'

export default {
  title: 'Components/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    image: {
      control: 'select',
      options: ['1', '2', '3'],
      description: 'Image variant (predefined layouts)',
    },
    src: {
      control: 'text',
      description: 'Custom image URL (overrides variant)',
    },
    alt: {
      control: 'text',
      description: 'Alt text for accessibility',
    },
  },
}

export const Variant1Placeholder = {
  args: {
    image: '1',
    alt: 'Recipe image',
  },
}

export const Variant2Placeholder = {
  args: {
    image: '2',
    alt: 'Recipe image with overlay',
  },
  parameters: {
    docs: {
      description: {
        story: 'Variant 2 supports layered images (primary + overlay)',
      },
    },
  },
}

export const Variant3Placeholder = {
  args: {
    image: '3',
    alt: 'Recipe image',
  },
}

export const CustomSource = {
  args: {
    src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=240&fit=crop',
    alt: 'Fresh salad bowl',
  },
  parameters: {
    docs: {
      description: {
        story: 'When src prop is provided, it overrides the variant system',
      },
    },
  },
}

export const InContainer = {
  render: (args) => (
    <div style={{ width: '360px' }}>
      <Image {...args} />
    </div>
  ),
  args: {
    src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=240&fit=crop',
    alt: 'Pizza with toppings',
  },
  parameters: {
    docs: {
      description: {
        story: 'Image is responsive and fills 100% of container width',
      },
    },
  },
}
