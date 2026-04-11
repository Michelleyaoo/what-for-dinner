import { useState, useRef, useEffect } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { ArrowLeft } from 'phosphor-react'
import Chip from './Chip'
import ALL_INGREDIENTS, { POPULAR_INGREDIENTS } from '../data/ingredients'

function MobileSearchOverlay({ selectedIngredients, onToggleIngredient, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  // Auto-focus the input when overlay mounts
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 50)
    return () => clearTimeout(t)
  }, [])

  const selectedNames = selectedIngredients.map((ing) =>
    ing.replace(/\p{Emoji}\s*/gu, '').trim().toLowerCase()
  )

  const filtered = query.trim()
    ? ALL_INGREDIENTS.filter(
        (item) =>
          item.name.toLowerCase().startsWith(query.toLowerCase()) &&
          !selectedNames.includes(item.name.toLowerCase())
      )
    : []

  const availablePopular = POPULAR_INGREDIENTS.filter(
    (ing) => !selectedIngredients.includes(ing)
  )

  const handleSelect = (ingredient) => {
    onToggleIngredient(ingredient)
    onClose()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filtered.length > 0) {
      handleSelect(`${filtered[0].emoji} ${filtered[0].name}`)
    }
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <Box
      position="fixed"
      inset="0"
      bg="neutral.background"
      zIndex="1000"
      display="flex"
      flexDirection="column"
    >
      {/* Header */}
      <Box px="4" pt="5" pb="4">
        <Box
          as="button"
          display="inline-flex"
          alignItems="center"
          gap="2"
          bg="transparent"
          border="none"
          cursor="pointer"
          p="0"
          onClick={onClose}
        >
          <ArrowLeft size={18} weight="bold" color="var(--chakra-colors-primary-500)" />
          <Text textStyle="headlineSemibold" color="primary.500">Back</Text>
        </Box>
      </Box>

      {/* Search input */}
      <Box px="4" pb="4">
        <Box
          bg="white"
          border="1px solid"
          borderColor="primary.200"
          borderRadius="lg"
          px="4"
          py="3"
          display="flex"
          alignItems="center"
          minH="52px"
        >
          <Box
            as="input"
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search ingredients..."
            flex="1"
            border="none"
            outline="none"
            bg="transparent"
            textStyle="subheadMedium"
            color="neutral.ink"
            _placeholder={{ color: 'grey.400' }}
            p="0"
          />
        </Box>
      </Box>

      {/* Results area */}
      <Box flex="1" overflowY="auto">
        {query.trim().length > 0 ? (
          filtered.length > 0 ? (
            filtered.map((item, index) => (
              <Box
                key={item.name}
                px="4"
                py="4"
                cursor="pointer"
                bg={index === 0 ? 'primary.50' : 'transparent'}
                _hover={{ bg: 'primary.50' }}
                borderBottom="1px solid"
                borderColor="grey.100"
                onClick={() => handleSelect(`${item.emoji} ${item.name}`)}
              >
                <Text textStyle="headlineMedium" color="neutral.ink">
                  {item.emoji} {item.name}
                </Text>
              </Box>
            ))
          ) : (
            <Box px="4" py="10" textAlign="center">
              <Text textStyle="bodyRegular" color="grey.400">
                No matching ingredients
              </Text>
            </Box>
          )
        ) : (
          <Flex wrap="wrap" gap="3" px="4" pt="2">
            {availablePopular.map((ing) => (
              <Chip
                key={ing}
                text={ing}
                isSelected={false}
                onClick={() => handleSelect(ing)}
                size="Small"
              />
            ))}
          </Flex>
        )}
      </Box>
    </Box>
  )
}

export default MobileSearchOverlay
