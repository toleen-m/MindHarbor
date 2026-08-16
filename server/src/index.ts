import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import routerAuth from "./routes/auth.routes.js"
import routerUser from "./routes/user.routes.js"
import routerMessage from "./routes/messages.routes.js"

import journalRouter from "./routes/journal.routes.js"
import resourceRouter from "./routes/resource.routes.js"

dotenv.config()

const app = express()

app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json())

app.use("/users", routerUser)
app.use("/messages", routerMessage)
app.use("/auth", routerAuth)


app.use("/journal", journalRouter)
app.use("/", resourceRouter)



app.get("/", (req, res) => {
    res.json({ message: "MindHarbor API fonctionne" })
})

app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000")
})