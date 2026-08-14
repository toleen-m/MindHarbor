import axios from 'axios'

export const api = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000
})

async function demo(){
    const { data } = await api.post("/auth/register", {
        nom: "unaiza",
        email: "test2@gmail.com",
        password: "123456"
    })

    console.log(data)
}

demo().catch((e) => {
    if(axios.isAxiosError(e)){
        console.log("Erreur API :", e.response?.status, e.response?.data)
    }else{
        console.log("Erreur : ", e)
    }
})