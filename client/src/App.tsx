import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { AuthProvider } from "./context/AuthContext"
import Profile from "./pages/Profile"
import Privacy from "./pages/Privacy"
import Messages from "./pages/Messages"
import Navbar from "./components/Navbar"

import Journal from "./pages/Journal"
import Resource from "./pages/Resource"
// import Group from "./pages/Group"
// import Admin from "./pages/Admin"


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

                    <Route path="/journal" element={<Journal />} />
                    <Route path="/resource" element={<Resource />} />
                    {/* <Route path="/group" element={<Group /> } /> */}
                    {/* <Route path="/admin" element={<Admin />} /> */}

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App