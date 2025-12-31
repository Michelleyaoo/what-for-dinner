import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ResultList from './pages/ResultList'
import RecipeDetail from './pages/RecipeDetail'
import system from './theme'

function App() {
  return (
    <ChakraProvider value={system}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<ResultList />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App

