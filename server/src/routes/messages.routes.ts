import { Router, type Request, type Response } from "express"
import prisma from "../lib/prisma.js"
import { authentifier } from "../middlewares/middleware.js"

const routerMessage = Router()

// POST /messages -> Envoyer un message
routerMessage.post("/", authentifier, async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.sub
        const { recipiantId, contenu } = req.body

        if (!recipiantId || !contenu) {
            return res.status(400).json({
                erreur: "Destinataire et contenu obligatoires"
            })
        }

        const destinataire = await prisma.user.findUnique({
            where: { id: recipiantId }
        })

        if (!destinataire) {
            return res.status(404).json({
                erreur: "Destinataire introuvable"
            })
        }

        const message = await prisma.message.create({
            data: {
                envoyerParId: userId,
                recipiantId,
                contenu
            }
        })

        res.status(201).json(message)

    } catch {
        res.status(500).json({
            erreur: "Erreur serveur"
        })
    }
})

// GET /messages -> Voir mes messages reçus
routerMessage.get("/", authentifier, async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.sub

        const messages = await prisma.message.findMany({
            where: {
                recipiantId: userId
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        res.json(messages)

    } catch {
        res.status(500).json({
            erreur: "Erreur serveur"
        })
    }
})

export default routerMessage