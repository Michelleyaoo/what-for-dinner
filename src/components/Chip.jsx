import { Tag } from '@chakra-ui/react'
import { X } from 'phosphor-react'

/**
 * Chip Component
 * 
 * A selectable chip with support for default and selected states.
 * Built on Chakra UI's Tag component with custom theming.
 * 
 * @param {string} text - The chip label
 * @param {function} onClick - Handler for selection/deselection
 * @param {boolean} isSelected - Whether the chip is selected
 * @param {string} size - 'Small' or 'Big'
 */
function Chip({ 
  text, 
  onClick, 
  isSelected = false, 
  size = 'Big' 
}) {
  const tagSize = size === 'Small' ? 'sm' : 'md'
  const variant = isSelected ? 'selected' : 'default'
  const gap = isSelected ? '2' : '0'
  
  // Handler for the close button - toggles selection state
  const handleRemove = (e) => {
    e.stopPropagation()
    if (onClick) {
      onClick()
    }
  }
  
  // Common styles for all sizes
  const sizeStyles = {
    px: '4',
    py: '3',
    borderRadius: 'md',
  }
  
  // Explicit styles for states to ensure colors apply
  const stateStyles = isSelected ? {
    bg: 'primary.100',
    color: 'neutral.ink',
    border: '1px solid',
    borderColor: 'primary.200',
    transition: 'all 0.4s ease',
    _hover: {
      bg: 'primary.200',
    }
  } : {
    bg: 'primary.50',
    color: 'neutral.ink',
    border: '1px solid',
    borderColor: 'primary.100',
    transition: 'all 0.4s ease',
    _hover: {
      bg: 'neutral.borderHover',
      borderColor: 'primary.200',
    }
  }
  
  return (
    <Tag.Root
      variant={variant}
      size={tagSize}
      onClick={onClick}
      display="flex"
      alignItems="center"
      gap={gap}
      cursor={onClick ? 'pointer' : 'default'}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(e)
        }
      } : undefined}
      {...sizeStyles}
      {...stateStyles}
    >
      <Tag.Label 
        textStyle={size === 'Small' ? 'subheadMedium' : 'headlineMedium'}
        display="flex"
        alignItems="center"
      >
        {text}
      </Tag.Label>
      {isSelected && (
        <Tag.EndElement
          display="flex"
          alignItems="center"
        >
          <Tag.CloseTrigger
            as="button"
            aria-label="Remove selection"
            onClick={handleRemove}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleRemove(e)
              }
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            w={size === 'Small' ? '4' : '4'}
            h={size === 'Small' ? '4' : '4'}
            minW={size === 'Small' ? '4' : '4'}
            padding="0"
            margin="0"
            border="none"
            bg="transparent"
            color="grey.700"
            type="button"
          >
            <X size={16} weight="bold" />
          </Tag.CloseTrigger>
        </Tag.EndElement>
      )}
    </Tag.Root>
  )
}

export default Chip
