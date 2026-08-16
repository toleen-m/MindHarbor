import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";



export default function Resource() {

    const { token } = useAuth();
    const [resources,setResources] = useState<any[]>([]);
    const [favorites,setFavorites] = useState<any[]>([]);
    const [suggestions,setSuggestions] = useState<any[]>([]);

    async function loadResources() {
        const response =
            await fetch("http://localhost:3000/resources");

        setResources(
            await response.json()
        );
    }



    async function loadFavorites() {
        const response = await fetch("http://localhost:3000/me/favorites", {
                headers:{
                    Authorization: `Bearer {{login.response.body.token}}`
                }
            }
        );

        setFavorites(
            await response.json()
        );
    }

    async function loadSuggestions() {
        const response =
            await fetch("http://localhost:3000/me/suggestions", {
                    headers:{
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

        setSuggestions(
            await response.json()
        );
    }

    async function addFavorite(id:string){
        await fetch(`http://localhost:3000/resources/${id}/favorite`, {
                method:"POST",
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        loadFavorites();
    }

    async function removeFavorite(id:string){
        await fetch(`http://localhost:3000/resources/${id}/favorite`, {
                method:"DELETE",
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        loadFavorites();
    }


    useEffect(() => {
        loadResources();
        if (token) {
            loadFavorites();
            loadSuggestions();
        }

    }, [token]);

    return (
        <div>
            <h1>Ressources</h1>
            <h2>Toutes les ressources</h2>
            {resources.map(r => (
                <div key={r.id}>
                    <p>{r.titre}</p>
                    <button
                        onClick={() =>
                            addFavorite(r.id)
                        }
                    >
                        Favori
                    </button>
                </div>
            ))}

            <h2>Favoris</h2>

            {favorites.map((f:any) => (
                <div key={f.resource.id}>
                    {f.resource.titre}
                    <button
                        onClick={() =>
                            removeFavorite(
                                f.resource.id
                            )
                        }
                    >
                        Retirer
                    </button>
                </div>
            ))}

            <h2>Suggestions</h2>

            {suggestions.map((s:any) => (
                <div key={s.id}>
                    {s.titre}
                </div>
            ))}

        </div>
    );
}