import { useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"

function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault()

        try {
          await api.post("/auth/register", {
            email,
            password
       })

        setMessage("Compte créé avec succès !")

        navigate("/login")
        } catch (error: any) {
            setMessage(
                error.response?.data?.erreur || "Erreur lors de l'inscription"
            )
        }
    }

    return (
        <div>
            <h1>Créer un compte</h1>

            <form onSubmit={handleRegister}>
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
                    Créer mon compte
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    )
}

export default Register