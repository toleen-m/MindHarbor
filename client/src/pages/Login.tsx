import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()

        try {
            const response = await api.post("/auth/login", {
                email,
                password
            })

            localStorage.setItem("token", response.data.token)

            setMessage("Connexion réussie !")

            navigate("/profile")
        } catch (error: any) {
            setMessage(
                error.response?.data?.erreur || "Erreur de connexion"
            )
        }
    }

    return (
        <div>
            <h1>Connexion</h1>

            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">
                    Se connecter
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    )
}

export default Login