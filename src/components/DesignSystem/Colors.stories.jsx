import { Box, Flex, VStack, HStack } from '@chakra-ui/react'

export default {
  title: 'Design System/Colors',
  parameters: {
    layout: 'padded',
  },
}

const ColorSwatch = ({ color, name, value }) => (
  <VStack spacing="2" align="start" flex="1" minW="140px">
    <Box
      w="100%"
      h="80px"
      bg={color}
      borderRadius="sm"
      border="1px solid"
      borderColor="grey.200"
    />
    <Box>
      <Box textStyle="subheadSemibold" color="neutral.ink">
        {name}
      </Box>
      <Box textStyle="subheadRegular" color="grey.600">
        {value}
      </Box>
    </Box>
  </VStack>
)

export const NeutralColors = {
  render: () => (
    <VStack spacing="6" align="stretch">
      <Box textStyle="title2" color="neutral.ink">
        Neutral Colors
      </Box>
      <Flex gap="4" wrap="wrap">
        <ColorSwatch color="neutral.ink" name="Ink" value="#333333" />
        <ColorSwatch color="neutral.cream" name="Cream" value="#fff4e9" />
        <ColorSwatch color="neutral.background" name="Background" value="#fbf8f5" />
        <ColorSwatch color="neutral.border" name="Border" value="#eedecd" />
        <ColorSwatch color="neutral.borderHover" name="Border Hover" value="#ffe9d0" />
      </Flex>
    </VStack>
  ),
}

export const PrimaryColors = {
  render: () => (
    <VStack spacing="6" align="stretch">
      <Box textStyle="title2" color="neutral.ink">
        Primary (Brand) Colors
      </Box>
      <Flex gap="4" wrap="wrap">
        <ColorSwatch color="primary.50" name="Primary 50" value="#fff4e8" />
        <ColorSwatch color="primary.100" name="Primary 100" value="#fddcb9" />
        <ColorSwatch color="primary.200" name="Primary 200" value="#ffc78c" />
        <ColorSwatch color="primary.300" name="Primary 300" value="#ffb86b" />
        <ColorSwatch color="primary.400" name="Primary 400" value="#ffa850" />
        <ColorSwatch color="primary.500" name="Primary 500" value="#b55c00" />
      </Flex>
    </VStack>
  ),
}

export const GreyscaleColors = {
  render: () => (
    <VStack spacing="6" align="stretch">
      <Box textStyle="title2" color="neutral.ink">
        Greyscale Colors
      </Box>
      <Flex gap="4" wrap="wrap">
        <ColorSwatch color="grey.50" name="Grey 50" value="#f5f5f5" />
        <ColorSwatch color="grey.100" name="Grey 100" value="#ebebeb" />
        <ColorSwatch color="grey.200" name="Grey 200" value="#d6d6d6" />
        <ColorSwatch color="grey.300" name="Grey 300" value="#c2c2c2" />
        <ColorSwatch color="grey.400" name="Grey 400" value="#adadad" />
        <ColorSwatch color="grey.500" name="Grey 500" value="#999999" />
        <ColorSwatch color="grey.600" name="Grey 600" value="#858585" />
        <ColorSwatch color="grey.700" name="Grey 700" value="#707070" />
        <ColorSwatch color="grey.800" name="Grey 800" value="#5c5c5c" />
        <ColorSwatch color="grey.900" name="Grey 900" value="#474747" />
      </Flex>
    </VStack>
  ),
}

export const AllColors = {
  render: () => (
    <VStack spacing="10" align="stretch">
      <Box textStyle="heading" color="neutral.ink">
        Color System
      </Box>
      
      <VStack spacing="6" align="stretch">
        <Box textStyle="title2" color="neutral.ink">
          Neutral Colors
        </Box>
        <Flex gap="4" wrap="wrap">
          <ColorSwatch color="neutral.ink" name="Ink" value="#333333" />
          <ColorSwatch color="neutral.cream" name="Cream" value="#fff4e9" />
          <ColorSwatch color="neutral.background" name="Background" value="#fbf8f5" />
          <ColorSwatch color="neutral.border" name="Border" value="#eedecd" />
          <ColorSwatch color="neutral.borderHover" name="Border Hover" value="#ffe9d0" />
        </Flex>
      </VStack>

      <VStack spacing="6" align="stretch">
        <Box textStyle="title2" color="neutral.ink">
          Primary (Brand) Colors
        </Box>
        <Flex gap="4" wrap="wrap">
          <ColorSwatch color="primary.50" name="Primary 50" value="#fff4e8" />
          <ColorSwatch color="primary.100" name="Primary 100" value="#fddcb9" />
          <ColorSwatch color="primary.200" name="Primary 200" value="#ffc78c" />
          <ColorSwatch color="primary.300" name="Primary 300" value="#ffb86b" />
          <ColorSwatch color="primary.400" name="Primary 400" value="#ffa850" />
          <ColorSwatch color="primary.500" name="Primary 500" value="#b55c00" />
        </Flex>
      </VStack>

      <VStack spacing="6" align="stretch">
        <Box textStyle="title2" color="neutral.ink">
          Greyscale Colors
        </Box>
        <Flex gap="4" wrap="wrap">
          <ColorSwatch color="grey.50" name="Grey 50" value="#f5f5f5" />
          <ColorSwatch color="grey.100" name="Grey 100" value="#ebebeb" />
          <ColorSwatch color="grey.200" name="Grey 200" value="#d6d6d6" />
          <ColorSwatch color="grey.300" name="Grey 300" value="#c2c2c2" />
          <ColorSwatch color="grey.400" name="Grey 400" value="#adadad" />
          <ColorSwatch color="grey.500" name="Grey 500" value="#999999" />
          <ColorSwatch color="grey.600" name="Grey 600" value="#858585" />
          <ColorSwatch color="grey.700" name="Grey 700" value="#707070" />
          <ColorSwatch color="grey.800" name="Grey 800" value="#5c5c5c" />
          <ColorSwatch color="grey.900" name="Grey 900" value="#474747" />
        </Flex>
      </VStack>
    </VStack>
  ),
  parameters: {
    layout: 'padded',
  },
}
