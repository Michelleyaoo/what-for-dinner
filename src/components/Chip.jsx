import { Tag } from '@chakra-ui/react'

function Chip({ 
  text, 
  onClick, 
  onRemove,
  isSelected = false, 
  size = 'Big' 
}) {
  const tagSize = size === 'Small' ? 'sm' : 'md'
  const variant = isSelected ? 'selected' : 'default'
  const gap = onRemove ? (size === 'Small' ? '2' : '4') : '0'
  
  return (
    <Tag.Root
      variant={variant}
      size={tagSize}
      as="button"
      onClick={onClick}
      display="flex"
      alignItems="center"
      gap={gap}
    >
      <Tag.Label>{text}</Tag.Label>
      {onRemove && (
        <Tag.EndElement>
          <Tag.CloseTrigger
            aria-label="Remove"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="4"
            h="4"
            minW="4"
            fontSize="md"
            lineHeight="1"
            color="grey.700"
            _hover={{
              color: 'neutral.ink',
            }}
            transition="color 0.2s ease"
          >
            ×
          </Tag.CloseTrigger>
        </Tag.EndElement>
      )}
    </Tag.Root>
  )
}

export default Chip
