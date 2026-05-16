import { Tag } from '@chakra-ui/react'
import { X } from 'phosphor-react'

function Chip({
  text,
  onClick,
  isSelected = false,
  size = 'Big',
}) {
  const tagSize = size === 'Small' ? 'sm' : 'md'
  const variant = isSelected ? 'selected' : 'default'

  const handleRemove = (e) => {
    e.stopPropagation()
    onClick?.()
  }

  const stateStyles = {
    color: 'primary.600',
    border: '1px solid',
    borderColor: 'primary.600',
    boxShadow: 'shadow-sm',
    transition: 'background 0.15s ease',
    ...(isSelected
      ? { bg: 'primary.100', _hover: { bg: 'primary.200' } }
      : { bg: 'primary.50',  _hover: { bg: 'primary.100' } }
    ),
  }

  return (
    <Tag.Root
      variant={variant}
      size={tagSize}
      onClick={onClick}
      display="flex"
      alignItems="center"
      gap={isSelected ? '2' : '0'}
      px="4"
      py="3"
      borderRadius="md"
      cursor={onClick ? 'pointer' : 'default'}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(e)
        }
      } : undefined}
      {...stateStyles}
    >
      <Tag.Label
        textStyle={size === 'Small' ? 'subheadSemibold' : 'headlineSemibold'}
        display="flex"
        alignItems="center"
      >
        {text}
      </Tag.Label>
      {isSelected && (
        <Tag.EndElement display="flex" alignItems="center">
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
            w="4"
            h="4"
            minW="4"
            padding="0"
            margin="0"
            border="none"
            bg="transparent"
            color="primary.600"
            type="button"
          >
            <X size={14} weight="bold" />
          </Tag.CloseTrigger>
        </Tag.EndElement>
      )}
    </Tag.Root>
  )
}

export default Chip
