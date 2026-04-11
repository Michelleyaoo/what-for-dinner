import { Component } from 'react'
import { Box, VStack, Text } from '@chakra-ui/react'
import Button from './Button'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught:', error, errorInfo)
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          minH="100vh"
          w="100%"
          bg="neutral.background"
          display="flex"
          alignItems="center"
          justifyContent="center"
          px="4"
        >
          <VStack gap="4" textAlign="center" maxW="480px">
            <Text textStyle="title2" color="neutral.ink">
              Something went wrong
            </Text>
            <Text textStyle="bodyRegular" color="grey.600">
              An unexpected error occurred. Please try again.
            </Text>
            <Button variant="primary" onClick={this.handleReset}>
              Back to Home
            </Button>
          </VStack>
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
