import { Router, type Request, type Response } from "express"
import prisma from "../../utils/prisma.js"
import { authentifier } from "../middlewares/middleware.js"

const routerUser = Router()

// GET /users/me -> Voir son profil
routerUser.get("/me", authentifier, async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.sub

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                nom: true,
                email: true,
                avatar: true,
                biographie: true,
                role: true
            }
        })

        if (!user) {
            return res.status(404).json({
                erreur: "Utilisateur introuvable"
            })
        }

        res.json(user)

    } catch {
        res.status(500).json({
            erreur: "Erreur serveur"
        })
    }
})

// PATCH /users/me -> Modifier son profil
routerUser.patch("/me", authentifier, async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.sub
        const { nom, avatar, biographie } = req.body

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                nom,
                avatar,
                biographie
            },
            select: {
                id: true,
                nom: true,
                email: true,
                avatar: true,
                biographie: true,
                role: true
            }
        })

        res.json(user)

    } catch {
        res.status(500).json({
            erreur: "Erreur serveur"
        })
    }
})
// PATCH /users/privacy -> Modifier les paramètres de confidentialité
routerUser.patch("/privacy", authentifier, async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.sub
        const { parametresVisibilite, parametresDeContact } = req.body

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                parametresVisibilite,
                parametresDeContact
            },
            select: {
                id: true,
                parametresVisibilite: true,
                parametresDeContact: true
            }
        })

        res.json(user)

    } catch {
        res.status(400).json({
            erreur: "Paramètres de confidentialité invalides"
        })
    }
})
export default routerUser