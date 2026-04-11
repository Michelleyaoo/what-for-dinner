import { lazy, Suspense } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import system from './theme'
import ErrorBoundary from './components/ErrorBoundary'

const Home = lazy(() => import('./pages/Home'))
const ResultList = lazy(() => import('./pages/ResultList'))
const RecipeDetail = lazy(() => import('./pages/RecipeDetail'))

function App() {
  return (
    <ChakraProvider value={system}>
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/results" element={<ResultList />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App

