import { lazy, Suspense, useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import system from './theme'
import ErrorBoundary from './components/ErrorBoundary'
import AppLoading from './components/AppLoading'

const Home = lazy(() => import('./pages/Home'))
const ResultList = lazy(() => import('./pages/ResultList'))
const RecipeDetail = lazy(() => import('./pages/RecipeDetail'))

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <ChakraProvider value={system}>
      <BrowserRouter>
        <ErrorBoundary>
          {isLoading && <AppLoading onDone={() => setIsLoading(false)} />}
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

