import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "../commons/Navbar"
import Home from "./Home"
import Test from "./Test"
import WithBackgroundImage from "./WithBackgroundImage"

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/test2" element={<WithBackgroundImage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
