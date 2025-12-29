import { Box } from '@chakra-ui/react'

function Chip({ 
  text, 
  onClick, 
  onRemove,
  isSelected = false, 
  size = 'Big' 
}) {
  const isSmall = size === 'Small'
  const fontSize = isSmall ? '14px' : '16px'
  const lineHeight = isSmall ? '18px' : '20px'
  
  return (
    <Box
      as="button"
      onClick={onClick}
      px="md"
      py="sm"
      borderRadius="md"
      fontSize={fontSize}
      lineHeight={lineHeight}
      fontWeight={500}
      whiteSpace="nowrap"
      cursor="pointer"
      transition="all 0.2s ease"
      display="flex"
      alignItems="center"
      gap={onRemove ? "xs" : "0"}
      bg={isSelected ? 'primary.100' : 'primary.50'}
      border="1px solid"
      borderColor={isSelected ? 'primary.100' : 'primary.100'}
      color="neutral.ink"
      _hover={{
        bg: isSelected ? 'primary.300' : 'neutral.borderHover',
        borderColor: isSelected ? 'primary.300' : 'primary.200',
      }}
    >
      <Box as="span">{text}</Box>
      {onRemove && (
        <Box
          as="button"
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="16px"
          h="16px"
          minW="16px"
          fontSize="md"
          lineHeight="1"
          color="grey.700"
          _hover={{
            color: 'neutral.ink',
          }}
          transition="color 0.2s ease"
        >
          ×
        </Box>
      )}
    </Box>
  )
}

export default Chip
