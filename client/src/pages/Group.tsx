import { useEffect,useState } from "react";
import { useAuth } from "../context/AuthContext";




export default function Group(){

    const { token } = useAuth();
    const [groups,setGroups] = useState<any[]>([]);
    const [selectedGroup,setSelectedGroup] = useState<string>("");
    const [posts,setPosts] = useState<any[]>([]);
    const [contenu,setContenu] = useState("");

    async function loadGroups(){
        const response =
            await fetch("http://localhost:3000/groups");

        setGroups(
            await response.json()
        );
    }

    async function joinGroup(id:string){
        await fetch(`http://localhost:3000/groups/${id}/join`, {
                method:"POST",
                headers:{
                    Authorization:
                    `Bearer ${token}`
                }
            }
        );
    }

    async function loadPosts(id:string){
        setSelectedGroup(id);
        const response = await fetch(`http://localhost:3000/groups/${id}/posts`,
                {
                    headers:{
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

        setPosts(
            await response.json()
        );
    }

    async function createPost(){
        await fetch(`http://localhost:3000/groups/${selectedGroup}/posts`,{
                method:"POST",
                headers:{
                    "Content-Type":
                    "application/json",

                    Authorization:
                    `Bearer ${token}`
                },

                body:JSON.stringify({
                    contenu
                })
            }
        );

        loadPosts(selectedGroup);
    }

    useEffect(()=>{
        loadGroups();
    },[]);

    return(
        <div>
            <h1>Groupes</h1>
            {groups.map(group=>(
                <div key={group.id}>
                    <p>{group.nom}</p>
                    <button
                        onClick={() =>
                            joinGroup(group.id)
                        }
                    >
                        Rejoindre
                    </button>
                    <button
                        onClick={() =>
                            loadPosts(group.id)
                        }
                    >
                        Voir posts
                    </button>
                </div>
            ))}

            <hr />

            <input
                placeholder="Post"
                value={contenu}
                onChange={(e)=>
                    setContenu(e.target.value)
                }
            />

            <button onClick={createPost}>
                Créer post
            </button>

            {posts.map(post => (
                <div key={post.id}>
                    {post.contenu}
                </div>

            ))}

        </div>
    );
}