import { useState, useRef, useEffect } from 'react'
import { Box, Text } from '@chakra-ui/react'
import Chip from './Chip'
import ALL_INGREDIENTS from '../data/ingredients'

function IngredientSearch({ selectedIngredients, onToggleIngredient }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef(null)
  const containerRef = useRef(null)
  const listRef = useRef(null)

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

  const showDropdown = isOpen && query.trim().length > 0 && filtered.length > 0

  useEffect(() => {
    setHighlightedIndex(-1)
  }, [query])

  useEffect(() => {
    if (!showDropdown) return

    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showDropdown])

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.children
      if (items[highlightedIndex]) {
        items[highlightedIndex].scrollIntoView({ block: 'nearest' })
      }
    }
  }, [highlightedIndex])

  const selectIngredient = (item) => {
    onToggleIngredient(`${item.emoji} ${item.name}`)
    setQuery('')
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (!showDropdown) {
      if (e.key === 'Backspace' && query === '' && selectedIngredients.length > 0) {
        onToggleIngredient(selectedIngredients[selectedIngredients.length - 1])
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev < filtered.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filtered.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && filtered[highlightedIndex]) {
          selectIngredient(filtered[highlightedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        break
    }
  }

  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  return (
    <Box ref={containerRef} position="relative" w="100%">
      {/* Input container */}
      <Box
        bg="white"
        border="1px solid"
        borderColor={isOpen && query ? 'primary.500' : 'neutral.border'}
        borderRadius="lg"
        px="4"
        py="3"
        minH="68px"
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        gap="3"
        cursor="text"
        transition="border-color 0.2s ease"
        onClick={handleContainerClick}
        _hover={{
          borderColor: isOpen && query ? 'primary.500' : 'primary.100',
        }}
      >
        {selectedIngredients.map((ingredient) => (
          <Chip
            key={ingredient}
            text={ingredient}
            isSelected={true}
            onClick={() => onToggleIngredient(ingredient)}
            size="Small"
          />
        ))}
        <Box
          as="input"
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true)
          }}
          onKeyDown={handleKeyDown}
          placeholder={
            selectedIngredients.length === 0
              ? 'what I have in the fridge...'
              : ''
          }
          flex="1"
          minW="120px"
          border="none"
          outline="none"
          bg="transparent"
          textStyle="subheadMedium"
          color="neutral.ink"
          _placeholder={{ color: 'grey.400' }}
          h="auto"
          p="0"
        />
      </Box>

      {/* Dropdown list */}
      {showDropdown && (
        <Box
          ref={listRef}
          position="absolute"
          top="100%"
          left="0"
          right="0"
          zIndex="10"
          bg="white"
          borderRadius="sm"
          overflow="hidden"
          boxShadow="card"
          maxH="252px"
          overflowY="auto"
          mt="1"
        >
          {filtered.map((item, index) => (
            <Box
              key={item.name}
              px="4"
              py="3"
              cursor="pointer"
              bg={index === highlightedIndex ? 'primary.100' : 'white'}
              _hover={{ bg: 'primary.100' }}
              transition="background 0.1s ease"
              onClick={() => selectIngredient(item)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <Text textStyle="subheadMedium" color="neutral.ink">
                {item.emoji} {item.name}
              </Text>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default IngredientSearch
