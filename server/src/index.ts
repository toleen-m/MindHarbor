import express from "express"
import dotenv from "dotenv"
import routerAuth from "./routes/auth.routes.js"
import routerUser from "./routes/user.routes.js"
import routerMessage from "./routes/messages.routes.js"

import journalRouter from "./routes/journal.routes.js"


dotenv.config()

const app = express()

app.use(express.json())
app.use("/users", routerUser)
app.use("/messages", routerMessage)

app.use("/auth", routerAuth)



app.use("/journal", journalRouter)




app.get("/", (req, res) => {
    res.json({ message: "MindHarbor API fonctionne" })
})

app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000")
})