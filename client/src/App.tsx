import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { AuthProvider } from "./context/AuthContext"
import Profile from "./pages/Profile"
import Privacy from "./pages/Privacy"
import Messages from "./pages/Messages"
import Navbar from "./components/Navbar"


function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
              <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/messages" element={<Messages />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App