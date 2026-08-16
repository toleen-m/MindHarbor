import { useEffect, useState } from "react"
import api from "../api/axios"

function Profile() {
    const [user, setUser] = useState<any>(null)
    const [message, setMessage] = useState("")

    useEffect(() => {
        async function getProfile() {
            try {
                const token = localStorage.getItem("token")

                const response = await api.get("/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setUser(response.data.utilisateur)
            } catch {
                setMessage("Impossible de récupérer le profil")
            }
        }

        getProfile()
    }, [])

    return (
        <div>
            <h1>Mon profil</h1>

            {message && <p>{message}</p>}

            {user && (
                <div>
                    <p>Email : {user.email}</p>
                    <p>Rôle : {user.role}</p>
                </div>
            )}
        </div>
    )
}

export default Profile