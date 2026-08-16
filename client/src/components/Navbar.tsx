import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {
    const { token, logout } = useAuth()
    const navigate = useNavigate()

    if (!token) {
        return null
    }

    function handleLogout() {
        logout()
        navigate("/login")
    }

    return (
        <nav>
            <Link to="/profile">Profile</Link>{" "}
            <Link to="/privacy">Privacy</Link>{" "}
            <Link to="/messages">Messages</Link>{" "}
            <Link to="/resource">Resources</Link>{" "}
            <Link to="/journal">Journal</Link>{" "}
            <Link to="/group">Group</Link>{" "}
            <Link to="/admin">Admin</Link>{" "}

            <button onClick={handleLogout}>
                Logout
            </button>
        </nav>
    )
}

export default Navbar