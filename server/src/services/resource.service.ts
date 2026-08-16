import prisma from '../lib/prisma.js';
import type { CreateResourceInput } from '../schemas/resource.schema.js';


// GET /activities
export async function getActivities() {

    return prisma.activite.findMany({
        orderBy: {
            nom: "asc"
        }
    });
}

// GET /resources
export async function getResources(query: any) {

    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);
    
    const where: any = {};

    if (query.titre) {
        where.titre = {
            contains: query.titre,
            mode: "insensitive"
        }
    }
    if (query.contenu) {
        where.titre = {
            contains: query.titre,
            mode: "insensitive"
        }
    }
    if (query.categorie) {
        where.categorie = query.categorie;
    }

    if (query.type) {
        where.type = query.type;
    }

    if (query.duree) {
        where.duree = Number(query.duree);
    }

    if (query.niveau) {
        where.niveau = query.niveau;
    }

    if (query.creePar) {
        where.creePar = query.creePar;
    }

    return prisma.resource.findMany({
        where,
        include: {
            user: {
                select: {
                    id: true,
                    nom: true
                }
            }
        },

        skip: (page - 1) * limit,
        take: limit,

        orderBy: {
            createdAt: "desc"
        }
    });

}

// GET /resources/:id
export async function getResourceById(id: string) {

    const resource = await prisma.resource.findUnique({
        where: { id },

        include: {
            user: {select: {
                id: true,
                nom: true}
            }
        },
    });

    if (!resource) {
        throw new Error("Ressource introuvable");
    }

    return resource;
}


export async function createResource(userId: string, data: CreateResourceInput) {

    return prisma.resource.create({
        data: {
            titre: data.titre,
            contenu: data.contenu ?? null,
            categorie: data.categorie,
            type: data.type,
            duree: data.duree ?? null,
            niveau: data.niveau,
            creePar: userId
        }
    });
}



export async function addFavorite(userId: string,resourceId: string) {

    const existingFavorite = await prisma.favorite.findUnique({
            where: {
                userId_resourceId: {
                    userId,
                    resourceId
                }
            }
        });

    if (existingFavorite) {
        throw new Error("Ressource déjà dans les favoris");
    }

    return prisma.favorite.create({
        data: {
            userId,
            resourceId
        }
    });
}

export async function removeFavorite(userId: string,resourceId: string) {

    return prisma.favorite.delete({
        where: {
            userId_resourceId: {
                userId,
                resourceId
            }
        }
    });
}


export async function getFavorites(userId: string) {

    return prisma.favorite.findMany({
        where: {
            userId
        },

        include: {
            resource: true
        }
    });
}


export async function getSuggestions(userId: string) {
    const lastEntry = await prisma.journalEntry.findFirst({
            where: {
                userId
            },

            orderBy: {
                date: "desc"
            }
        });

    if (!lastEntry) {
        return prisma.resource.findMany({
            take: 5
        });
    }

    if (lastEntry.niveauAnxiete >= 4) {
        return prisma.resource.findMany({
            where: {
                categorie: "ANXIETE"
            },

            take: 5
        });
    }

    if (lastEntry.qualiteDuSommeil <= 2) {
        return prisma.resource.findMany({
            where: {
                categorie: "SOMMEIL"
            },
            take: 5
        });
    }

    return prisma.resource.findMany({
        take: 5
    });
}


