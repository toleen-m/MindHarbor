import prisma from '../lib/prisma.js';
import type { CreateJournalInput, UpdateJournalInput } from '../schemas/journal.schema.js';


// GET localhost:3000/journal -> toutes les entrees du journal
export async function getEntries(userId: string) {
    return prisma.journalEntry.findMany({
        where: { userId },

        include: {
            activitesRealisees: true,
        },

        orderBy: {
            date: 'desc'
        }
    });
}


// POST localhost:3000/journal -> entree du jour
export async function createEntry(userId: string, data: CreateJournalInput) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const existing = await prisma.journalEntry.findFirst({
        where: {
            userId,
            date: today
        }
    });

    if (existing) {
        throw new Error('Entrée déjà créée aujourd\'hui');
    }

    return prisma.journalEntry.create({
        data: {
            userId,
            date: today,

            humeurGenerale: data.humeurGenerale,
            niveauEnergie: data.niveauEnergie,
            qualiteDuSommeil: data.qualiteDuSommeil,
            niveauAnxiete: data.niveauAnxiete,
            evenementMarquants: data.evenementMarquants,
            gratitude: data.gratitude || null,

        }

    })
}


// GET localhost:3000/journal/:date -> entree specifique
export async function getEntryByDate(userId: string, date: string) {
    return prisma.journalEntry.findFirst({
        where: {
            userId,
            date: new Date(date)
        },
        include: {
            activitesRealisees: true,
        }
    });
}


// PATCH localhost:3000/journal/:date -> modifier l'entree du jour
export async function updateEntryByDate(userId: string, date: string, data: UpdateJournalInput) {
    const entry = await prisma.journalEntry.findFirst({
        where: {
            userId,
            date: new Date(date)
        }
    });

    if (!entry) {
        throw new Error('Introuvable');
    }

    const today = new Date().toDateString();

    if (entry.date.toDateString() !== today) {
        throw new Error('Modification expirée');
    }

    // ai ma aider a regler ca
    const updateData = Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined)
    );

    return prisma.journalEntry.update({
        where: {
            id: entry.id
        },
        data: updateData
    });
}


// GET localhost:3000/journal/stats?range=30d -> statistiques sur les entrees du journal


// GET localhost:3000/journal/insights -> insights sur les entrees du journal
