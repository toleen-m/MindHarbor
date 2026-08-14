import "dotenv/config"
import { Router, type Request, type Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { PrismaClient } from "../../generated/prisma/client.js"
import { PrismaPg } from "@prisma/adapter-pg"

const routerAuth = Router()

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
})

const prisma = new PrismaClient({
    adapter
})


routerAuth.post("/register", async (req: Request, res: Response) => {
    const { nom, email, password } = req.body

    if (!nom || !email || !password) {
        return res.status(400).json({
            erreur: "Nom, email ou mot de passe manquant !"
        })
    }

    try {
        const pass_hash = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                nom,
                email,
                password: pass_hash,
                avatar: "",
                biographie: ""
            }
        })

     
        res.status(201).json({
            id: user.id,
            nom: user.nom,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        })
} catch (error) {
    console.log(error)

    res.status(400).json({
        erreur: "Erreur lors de la création"
    })
}
})

export default routerAuth