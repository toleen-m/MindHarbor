import prisma from '../lib/prisma.js';
import type { CreateJournalInput, UpdateJournalInput } from '../schemas/journal.schema.js';


// GET localhost:3000/journal -> toutes les entrees du journal
export async function getEntries(userId: string) {
    const entries = await prisma.journalEntry.findMany({
        where: { userId },

        include: {
            activitesRealisees: true,
        },

        orderBy: {
            date: 'desc'
        }
    });

    console.log("ENTRIES:", entries);
    return entries;
}


// POST localhost:3000/journal -> entree du jour
export async function createEntry(userId: string, data: CreateJournalInput) {
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    
    const startOfDay = new Date();
    startOfDay.setHours(0,0,0,0);

    const endOfDay = new Date();
    endOfDay.setHours(23,59,59,999);

    const existing =
        await prisma.journalEntry.findFirst({
            where: {
                userId,
                date: {
                    gte: startOfDay,
                    lte: endOfDay
                }
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

    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${date}T23:59:59.999`);

    return prisma.journalEntry.findFirst({
        where: {
            userId,
            date: {
                gte: startOfDay,
                lte: endOfDay
            }
        },

        include: {
            activitesRealisees: true
        }
    });
}


// PATCH localhost:3000/journal/:date -> modifier l'entree du jour
export async function updateEntryByDate(userId: string, date: string, data: UpdateJournalInput) {
    
    // console.log("URL DATE:", date);
    // console.log("TODAY:", new Date().toLocaleDateString('en-CA'));

    const requestedDate = new Date(`${date}T00:00:00`);

    const startsOfToday = new Date(requestedDate);
    startsOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date(requestedDate);
    endOfToday.setHours(23, 59, 59, 999);


    const entry = await prisma.journalEntry.findFirst({
        where: {
            userId,
            date: {
                gte: startsOfToday,
                lte: endOfToday
            }
        }
    });

    if (!entry) {
        throw new Error('Introuvable');
    }

    

    const requestedDay = date;

    const todayDay =
        new Date().toLocaleDateString('en-CA');

    if (requestedDay !== todayDay) {
        throw new Error('Modification expirée');
}

    // ia ma aider a regler ca
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
export async function getStats(userId: string, days: number) {

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const stats = await prisma.journalEntry.aggregate({
        where: {
            userId,
            date: {
                gte: startDate
            }
        },

        _avg: {
            humeurGenerale: true,
            niveauEnergie: true,
            qualiteDuSommeil: true,
            niveauAnxiete: true
        },

        _count: {
            id: true
        }
    });

    return {
        NombreEntrees: stats._count.id,
        moyenneHumeur: stats._avg.humeurGenerale,
        moyenneEnergie: stats._avg.niveauEnergie,
        moyenneSommeil: stats._avg.qualiteDuSommeil,
        moyenneAnxiete: stats._avg.niveauAnxiete
    };
}



// GET localhost:3000/journal/insights -> insights sur les entrees du journal
export async function getInsights(userId: string) {

    const stats = await prisma.journalEntry.aggregate({
        where: {
            userId
        },

        _avg: {
            humeurGenerale: true,
            niveauEnergie: true,
            qualiteDuSommeil: true,
            niveauAnxiete: true
        }
    });

    const insights: string[] = [];
    const humeur = stats._avg.humeurGenerale ?? 0;
    const energie = stats._avg.niveauEnergie ?? 0;
    const sommeil = stats._avg.qualiteDuSommeil ?? 0;
    const anxiete = stats._avg.niveauAnxiete ?? 0;


    if (humeur >= 4) {
        insights.push("Votre humeur est généralement positive.");
    }
    else if (humeur <= 2) {
        insights.push("Votre humeur moyenne est plutôt faible.");
    }


    if (energie >= 4) {
        insights.push("Votre niveau d'énergie est généralement bon.");
    }
    else if (energie <= 2) {
        insights.push("Votre niveau d'énergie semble assez faible.");
    }

    if (sommeil <= 2) {
        insights.push("Votre qualité du sommeil semble faible.");
    }
    else if (sommeil >= 4) {
        insights.push("Votre qualité du sommeil semble bonne.");
    }


    if (anxiete >= 4) {
        insights.push("Votre niveau d'anxiété semble élevé.");
    }
    else if (anxiete <= 2) {
        insights.push("Votre niveau d'anxiété semble faible.");
    }



    if (insights.length === 0) {
        insights.push("Vos indicateurs sont relativement équilibrés.");
    }


    return {
        insights
    };
}