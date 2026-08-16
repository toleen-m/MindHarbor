import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";




export default function Journal() {
    const { token } = useAuth();
    const [entries, setEntries] = useState<any[]>([]);
    const [activities, setActivities] = useState<any[]>([]);

    const [form, setForm] = useState({
        humeurGenerale: 3,
        niveauEnergie: 3,
        qualiteDuSommeil: 3,
        niveauAnxiete: 3,
        evenementMarquants: "",
        gratitude: "",
        activiteId: [],
    });


    async function loadActivities() {
        const response = await fetch("http://localhost:3000/activities");
        const data = await response.json();
        setActivities(data);
    }

    async function loadEntries() {
        const response = await fetch("http://localhost:3000/journal",{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();
        setEntries(data);
    }


    async function createEntry() {

        const response = await fetch("http://localhost:3000/journal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify(form)
            }
        );

        const data = await response.json();
        console.log(data);
        loadEntries();
    }


    async function updateEntry(date: string) {
        const response = await fetch(`http://localhost:3000/journal/${date}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form)
            }
        );

        const data = await response.json();
        console.log(data);
        loadEntries();
    }


    useEffect(() => {
        loadEntries();
        loadActivities();
    }, []);


    return (
        <div>
            <h1>Mon journal</h1>

            <h2>Nouvelle entrée</h2>
            <label>
                Humeur générale :
            </label>
            <select
                value={form.humeurGenerale}
                onChange={(e) =>
                    setForm({
                        ...form,
                        humeurGenerale:
                            Number(e.target.value)
                    })
                }
            >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>

            <br />
            <br />

            <label>
                Niveau d'énergie :
            </label>
            <select
                value={form.niveauEnergie}
                onChange={(e) =>
                    setForm({
                        ...form,
                        niveauEnergie:
                            Number(e.target.value)
                    })
                }
            >
                <option value={1}></option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>

            <br />
            <br />

            <label>
                Qualité du sommeil :
            </label>
            <select
                value={form.qualiteDuSommeil}
                onChange={(e) =>
                    setForm({
                        ...form,
                        qualiteDuSommeil:
                            Number(e.target.value)
                    })
                }
            >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>

            <br />
            <br />

            <label>
                Niveau d'anxiété :
            </label>
            <select
                value={form.niveauAnxiete}
                onChange={(e) =>
                    setForm({
                        ...form,
                        niveauAnxiete:
                            Number(e.target.value)
                    })
                }
            >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>

            <br />
            <br />


            <label>
                Événements marquants :
            </label>
            <br />
            <textarea
                value={form.evenementMarquants}
                placeholder="Qu'est-ce qui s'est passé aujourd'hui ?"
                onChange={(e) =>
                    setForm({
                        ...form,
                        evenementMarquants:
                            e.target.value
                    })
                }
            />

            <br />
            <br />

            <label>
                Gratitude :
            </label>
            <br />
            <textarea
                value={form.gratitude}
                placeholder="Pour quoi êtes-vous reconnaissant aujourd'hui ?"
                onChange={(e) =>
                    setForm({
                        ...form,
                        gratitude:
                            e.target.value
                    })
                }
            />

            <br />
            <br />

            <label>
                Activités réalisées
            </label>
            {/* {activities.map(activity => )} */}

            <br />
            <br />



            <button onClick={createEntry}>
                Créer mon entrée
            </button>
            <hr />



            <h2>Mes entrées</h2>
            {entries.length === 0 && (
                <p>
                    Aucune entrée dans votre journal.
                </p>
            )}


            {entries.map(entry => (
                <div key={entry.id}>
                    <h3>
                        {new Date(entry.date)
                            .toLocaleDateString()}
                    </h3>
                    <p>
                        Humeur :
                        {entry.humeurGenerale}/5
                    </p>
                    <p>
                        Énergie :
                        {entry.niveauEnergie}/5
                    </p>
                    <p>
                        Sommeil :
                        {entry.qualiteDuSommeil}/5
                    </p>
                    <p>
                        Anxiété :
                        {entry.niveauAnxiete}/5
                    </p>
                    <p>
                        Événement :
                        {entry.evenementMarquants}
                    </p>
                    <p>
                        Gratitude :
                        {entry.gratitude}
                    </p>
                    <button
                        onClick={() =>
                            updateEntry(
                                entry.date
                                    .split("T")[0]
                            )
                        }
                    >
                        Modifier avec les valeurs du formulaire
                    </button>
                    <hr />
                </div>
            ))}
        </div>
    );
}