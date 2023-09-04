import Register from "./pages/Register"
import Login from "./pages/Login"
import Logout from "./components/Logout"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import { useAtom } from "jotai"
import { userAtom } from "./atom"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  //const [user] = useAtom(userAtom)

  return (
    <>
      <BrowserRouter >
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={ <Home />}/>
            <Route path="/register" element={ <Register />}/>
            <Route path="/login" element={ <Login />}/>
          </Routes>
        </main>
      </BrowserRouter>
    </>

)}

export default App
