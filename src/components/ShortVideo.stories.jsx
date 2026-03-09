import ShortVideo from './ShortVideo'

export default {
  title: 'Components/ShortVideo',
  component: ShortVideo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    thumbnail: {
      control: 'text',
      description: 'Thumbnail image URL',
    },
    link: {
      control: 'text',
      description: 'External video link (opens in new tab)',
    },
    alt: {
      control: 'text',
      description: 'Alt text for accessibility',
    },
  },
}

export const WithThumbnail = {
  args: {
    thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=240&h=427&fit=crop',
    link: 'https://www.youtube.com/watch?v=example',
    alt: 'Recipe tutorial video',
  },
}

export const Placeholder = {
  args: {
    thumbnail: null,
    link: '#',
    alt: 'Recipe video',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows placeholder when no thumbnail is provided',
      },
    },
  },
}

export const NoLink = {
  args: {
    thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=240&h=427&fit=crop',
    link: '#',
    alt: 'Recipe video',
  },
  parameters: {
    docs: {
      description: {
        story: 'Video without external link (link="#")',
      },
    },
  },
}

export const MultipleVideos = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', overflow: 'auto', padding: '20px' }}>
      <ShortVideo
        thumbnail="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=240&h=427&fit=crop"
        link="https://www.youtube.com/watch?v=1"
        alt="Pasta recipe"
      />
      <ShortVideo
        thumbnail="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=240&h=427&fit=crop"
        link="https://www.youtube.com/watch?v=2"
        alt="Stir fry recipe"
      />
      <ShortVideo
        thumbnail="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=240&h=427&fit=crop"
        link="https://www.youtube.com/watch?v=3"
        alt="Salad recipe"
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Horizontal scrollable gallery of video thumbnails',
      },
    },
  },
}
