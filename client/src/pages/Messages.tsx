import { useState } from "react"
import api from "../api/axios"

function Messages() {
    const [recipientId, setRecipientId] = useState("")
    const [content, setContent] = useState("")
    const [message, setMessage] = useState("")

    async function sendMessage(e: React.FormEvent) {
        e.preventDefault()

        try {
            const token = localStorage.getItem("token")

            await api.post(
                "/messages",
                {
                    recipiantId: Number(recipientId),
                    contenu: content
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setMessage("Message envoyé !")
            setContent("")
        } catch {
            setMessage("Erreur lors de l'envoi du message")
        }
    }

    return (
        <div>
            <h1>Messages</h1>

            <form onSubmit={sendMessage}>
                <div>
                    <label>ID du destinataire</label>

                    <input
                        type="number"
                        value={recipientId}
                        onChange={(e) => setRecipientId(e.target.value)}
                    />
                </div>

                <div>
                    <label>Message</label>

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <button type="submit">
                    Envoyer
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    )
}

export default Messages