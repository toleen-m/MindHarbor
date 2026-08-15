import { Router } from 'express';
import prisma from '../lib/prisma.js';

const router = Router();

// GET localhost:3000/journal -> liste paginee de mes entrees
router.get('/', async (req, res) => {
    try{
        const entries = await prisma.journalEntry.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return res.status(200).json(entries);
    }catch (error) {
        console.error("Erreur GET /journal :", error)
        return res.status(500).json({ message: "Erreur lors de la récupération des entrées du journal" });
    }
})


// POST localhost:3000/journal -> entree du jour 
router.post('/', async (req, res) => {
    const { humeurGenerale, niveauEnergie, qualiteDuSommeil, niveauAnxiete } = req.body;

    try {
        const newEntry = await prisma.journalEntry.create({
            data: {
                humeurGenerale: req.body.humeurGenerale,
                niveauEnergie: req.body.niveauEnergie,
                qualiteDuSommeil: req.body.qualiteDuSommeil,
                niveauAnxiete: req.body.niveauAnxiete,
                userId: req.user.id
            }
        });
        return res.status(201).json(newEntry);
    } catch (error) {
        console.error("Erreur POST /journal :", error);
        return res.status(500).json({ message: "Erreur lors de la création de l'entrée du journal" });
    }
});


//GET localhost:3000/journal/:date 


// PATCH localhost:3000/journal/:date -> modifier l'entree du jour


// GET localhost:3000/journal/stats?range=30d -> statistiques sur les entrees du journal


// GET localhost:3000/journal/insights -> insights sur les entrees du journal


export default router;