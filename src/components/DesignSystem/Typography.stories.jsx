import { Box, VStack } from '@chakra-ui/react'

export default {
  title: 'Design System/Typography',
  parameters: {
    layout: 'padded',
  },
}

const TextStyleExample = ({ textStyle, label, weight, size, lineHeight }) => (
  <VStack spacing="2" align="start" py="4" borderBottom="1px solid" borderColor="grey.100">
    <Box textStyle={textStyle} color="neutral.ink">
      {label} - The quick brown fox jumps over the lazy dog
    </Box>
    <Box textStyle="subheadRegular" color="grey.600">
      {textStyle} • {size} • {weight} • Line height: {lineHeight}
    </Box>
  </VStack>
)

export const AllTextStyles = {
  render: () => (
    <VStack spacing="0" align="stretch" maxW="800px">
      <Box textStyle="heading" color="neutral.ink" mb="6">
        Typography System
      </Box>
      
      <TextStyleExample 
        textStyle="heading" 
        label="Heading"
        size="32px"
        weight="600"
        lineHeight="40px"
      />
      
      <TextStyleExample 
        textStyle="title1" 
        label="Title 1"
        size="24px"
        weight="600"
        lineHeight="28px"
      />
      
      <TextStyleExample 
        textStyle="title2" 
        label="Title 2"
        size="20px"
        weight="600"
        lineHeight="24px"
      />
      
      <TextStyleExample 
        textStyle="title3" 
        label="Title 3"
        size="18px"
        weight="600"
        lineHeight="22px"
      />
      
      <TextStyleExample 
        textStyle="headlineSemibold" 
        label="Headline Semibold"
        size="16px"
        weight="600"
        lineHeight="20px"
      />
      
      <TextStyleExample 
        textStyle="headlineMedium" 
        label="Headline Medium"
        size="16px"
        weight="500"
        lineHeight="20px"
      />
      
      <TextStyleExample 
        textStyle="bodyRegular" 
        label="Body Regular"
        size="16px"
        weight="400"
        lineHeight="20px"
      />
      
      <TextStyleExample 
        textStyle="bodyParagraph" 
        label="Body Paragraph"
        size="16px"
        weight="400"
        lineHeight="24px"
      />
      
      <TextStyleExample 
        textStyle="subheadSemibold" 
        label="Subhead Semibold"
        size="14px"
        weight="600"
        lineHeight="18px"
      />
      
      <TextStyleExample 
        textStyle="subheadMedium" 
        label="Subhead Medium"
        size="14px"
        weight="500"
        lineHeight="18px"
      />
      
      <TextStyleExample 
        textStyle="subheadRegular" 
        label="Subhead Regular"
        size="14px"
        weight="400"
        lineHeight="18px"
      />
      
      <TextStyleExample 
        textStyle="footnoteSemibold" 
        label="Footnote Semibold"
        size="14px"
        weight="600"
        lineHeight="16px"
      />
      
      <TextStyleExample 
        textStyle="footnoteMedium" 
        label="Footnote Medium"
        size="14px"
        weight="500"
        lineHeight="16px"
      />
      
      <TextStyleExample 
        textStyle="tinyLabelSemibold" 
        label="Tiny Label Semibold"
        size="12px"
        weight="600"
        lineHeight="14px"
      />
      
      <TextStyleExample 
        textStyle="tinyLabelMedium" 
        label="Tiny Label Medium"
        size="12px"
        weight="500"
        lineHeight="16px"
      />
    </VStack>
  ),
}

export const HeadingStyles = {
  render: () => (
    <VStack spacing="4" align="start">
      <Box textStyle="heading" color="neutral.ink">
        Heading - Main page titles
      </Box>
      <Box textStyle="title1" color="neutral.ink">
        Title 1 - Section headings
      </Box>
      <Box textStyle="title2" color="neutral.ink">
        Title 2 - Subsection headings
      </Box>
      <Box textStyle="title3" color="neutral.ink">
        Title 3 - Card titles
      </Box>
    </VStack>
  ),
}

export const BodyStyles = {
  render: () => (
    <VStack spacing="4" align="start" maxW="600px">
      <Box textStyle="headlineSemibold" color="neutral.ink">
        Headline Semibold - Emphasized body text
      </Box>
      <Box textStyle="headlineMedium" color="neutral.ink">
        Headline Medium - Standard body text
      </Box>
      <Box textStyle="bodyRegular" color="neutral.ink">
        Body Regular - Paragraph text with compact line height
      </Box>
      <Box textStyle="bodyParagraph" color="neutral.ink">
        Body Paragraph - Paragraph text with relaxed line height for better readability. 
        This text style is ideal for longer form content where reading comfort is important.
      </Box>
    </VStack>
  ),
}

export const SmallText = {
  render: () => (
    <VStack spacing="4" align="start">
      <Box textStyle="subheadSemibold" color="neutral.ink">
        Subhead Semibold - Labels and metadata
      </Box>
      <Box textStyle="subheadMedium" color="neutral.ink">
        Subhead Medium - Secondary information
      </Box>
      <Box textStyle="subheadRegular" color="grey.700">
        Subhead Regular - Helper text
      </Box>
      <Box textStyle="footnoteSemibold" color="neutral.ink">
        Footnote Semibold - Small emphasized text
      </Box>
      <Box textStyle="footnoteMedium" color="grey.700">
        Footnote Medium - Small secondary text
      </Box>
      <Box textStyle="tinyLabelSemibold" color="neutral.ink">
        Tiny Label Semibold - Badges and tags
      </Box>
      <Box textStyle="tinyLabelMedium" color="grey.600">
        Tiny Label Medium - Small labels
      </Box>
    </VStack>
  ),
}
