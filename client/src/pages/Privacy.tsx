import { useState } from "react"
import api from "../api/axios"

function Privacy() {
    const [visibility, setVisibility] = useState("PUBLIC")
    const [contact, setContact] = useState("MEMBRES_DE_MES_GROUPES")
    const [message, setMessage] = useState("")

    async function savePrivacy() {
        try {
            const token = localStorage.getItem("token")

            await api.patch(
                "/users/privacy",
                {
                    parametresVisibilite: visibility,
                    parametresDeContact: contact
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setMessage("Paramètres sauvegardés !")
        } catch {
            setMessage("Erreur lors de la sauvegarde")
        }
    }

    return (
        <div>
            <h1>Paramètres de confidentialité</h1>

            <div>
                <label>Visibilité du profil</label>

                <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                >
                    <option value="PUBLIC">Public</option>
                    <option value="PRIVE">Privé</option>
                </select>
            </div>

            <div>
                <label>Qui peut me contacter ?</label>

                <select
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                >
                    <option value="MEMBRES_DE_MES_GROUPES">
                        Membres de mes groupes
                    </option>
                    <option value="TOUT_LE_MONDE">
                        Tout le monde
                    </option>
                    <option value="PERSONNE">
                        Personne
                    </option>
                </select>
            </div>

            <button onClick={savePrivacy}>
                Sauvegarder
            </button>

            {message && <p>{message}</p>}
        </div>
    )
}

export default Privacy