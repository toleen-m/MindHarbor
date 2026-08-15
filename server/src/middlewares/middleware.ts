import { type Request, type Response, type NextFunction } from "express"
import dotenv from "dotenv"
dotenv.config()

import jwt from "jsonwebtoken"

export function authentifier(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization // Bearer xxx.yyy.zzz
    if (!header?.startsWith("Bearer ")) {
        return res.status(401).json({
            erreur: "Token manquant"
        })
    }

    const token = header.split(" ")[1]!


    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as any
        ;(req as any).user = {
            id: payload.sub,
            role: payload.role
        }
        next()
    } catch {
        res.status(401).json({
            erreur: "Token invalide / expiré"
        })
    }
}


export function exigerRole(role: String) {
    return (req: Request, res: Response, next: NextFunction) => {
        if ((req as any).user.role !== role) {
            return res.status(403).json({
                erreur: "Accès refusé"
            })
        }
        next()
    }
}