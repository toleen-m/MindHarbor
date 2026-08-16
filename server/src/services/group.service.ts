import prisma from "../lib/prisma.js";
import type {CreateGroupInput, CreatePostInput, CreateCommentInput, UpdateRequestInput} from "../schemas/group.schema.js";


// GET groups 
export async function getGroups(search?: string) {

    return prisma.group.findMany({
        where: search ? {
            OR: [{ nom: {
                        contains: search,
                        mode: "insensitive"
                    }},
                { theme: {
                        contains: search,
                        mode: "insensitive"
                    }
                }]
        } : {},

        include: {
            createur: {
                select: {
                    id: true,
                    nom: true
                }
            },

            _count: {
                select: {
                    membres: true
                }
            }
        },

        orderBy: {
            createdAt: "desc"
        }
    });
}



// POST group
export async function createGroup(userId: string, data: CreateGroupInput) {

    return prisma.group.create({
        data: {
            nom: data.nom,
            theme: data.theme,
            description: data.description,
            regles: data.regles,
            visibilite: data.visibilite,
            createurId: userId,
            membres: {
                create: {
                    userId,
                    role: "MODERATEUR",
                    statut: "ACCEPTEE",
                    dateJoint: new Date()
                }
            }
        },

        include: {
            membres: true
        }
    });
}



// GET group by id
export async function getGroupById(groupId: string, userId?: string) {

    const group = await prisma.group.findUnique({
        where: {
            id: groupId
        },

        include: {
            createur: {
                select: {
                    id: true,
                    nom: true
                }
            },

            _count: {
                select: {
                    membres: true,
                    posts: true
                }
            }
        }
    });

    if (!group) {
        throw new Error("Groupe introuvable");
    }

    let membership = null;

    if (userId) {
        membership =
            await prisma.groupMembre.findUnique({
                where: {
                    groupId_userId: {
                        groupId,
                        userId
                    }
                }
            });
    }

    return {
        ...group,
        membership
    };
}



// verifier membre
async function verifyMember(groupId: string, userId: string) {

    const member = await prisma.groupMembre.findUnique({
        where: {
            groupId_userId: {
                groupId,
                userId
            }
        }
    });

    if (!member || member.statut !== "ACCEPTEE") {
        throw new Error("Accès réservé aux membres");
    }

    return member;
}



// POST demande dadhesion
export async function joinGroup(groupId: string, userId: string) {

    const group = await prisma.group.findUnique({
      where: {
            id: groupId
        }
    });

    if (!group) {
        throw new Error("Groupe introuvable");
    }

    const existing = await prisma.groupMembre.findUnique({
        where: {
            groupId_userId: {
                groupId,
                userId
            }
        }
    });

    if (existing) {
        throw new Error(
            "Vous avez déjà une demande ou êtes déjà membre"
        );
    }

    return prisma.groupMembre.create({

        data: {
            groupId,
            userId,
            role: "MEMBRE",
            statut: "EN_ATTENTE"
        }
    });
}


// verifier si moderateur 
async function verifyModerator(groupId: string, userId: string) {

    const member = await prisma.groupMembre.findUnique({
        where: {
            groupId_userId: {
                groupId,
                userId
            }
        }
    });

    if (!member || member.statut !== "ACCEPTEE" || member.role !== "MODERATEUR") {
        throw new Error("Accès réservé aux modérateurs");
    }

    return member;
}



// GET (moderateur) demandes dadhesion
export async function getGroupRequests(groupId: string, userId: string) {

    await verifyModerator(groupId, userId);

    return prisma.groupMembre.findMany({
        where: {
            groupId,
            statut: "EN_ATTENTE"
        },

        include: {
            user: {
                select: {
                    id: true,
                    nom: true,
                    avatar: true
                }
            }
        },

        orderBy: {
            createdAt: "asc"
        }
    });
}



// PATCH accepter ou refuser une demande dadhesion
export async function updateGroupRequest(groupId: string, requestId: string, data: UpdateRequestInput, userId: string) {


    await verifyModerator(groupId, userId);

    const request =await prisma.groupMembre.findFirst({
        where: {
            id: requestId,
            groupId
        }
    });

    if (!request) {
        throw new Error(
            "Demande introuvable"
        );
    }

    if (data.statut === "REFUSEE") {
        return prisma.groupMembre.update({
            where: {
                id: requestId
            },
            data: {
                statut: "REFUSEE"
            }
        });
    }

    return prisma.groupMembre.update({
        where: {
            id: requestId
        },
        data: {
            statut: "ACCEPTEE",
            dateJoint: new Date()
        }
    });
}
// DELETE un membre?


// GET posts d'un groupe
export async function getGroupPosts(groupId: string, userId: string) {

    await verifyMember(groupId, userId);

    return prisma.post.findMany({
        where: {
            groupId
        },

        include: {
            auteur: {
                select: {
                    id: true,
                    nom: true,
                    avatar: true
                }
            },

            _count: {
                select: {
                    comments: true
                }
            }
        },

        orderBy: {
            createdAt: "desc"
        }
    });
}


// POST un post
export async function createPost(groupId: string, userId: string, data: CreatePostInput) {

    await verifyMember(groupId, userId);

    return prisma.post.create({
        data: {
            groupId,
            auteurId: userId,
            contenu: data.contenu,
            visibilite:
                data.visibilite ?? false
        }
    });
}

//DELETE un post?


// POST un commentaire
export async function createComment(postId: string, userId: string, data: CreateCommentInput) {


    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    });
    if (!post) {
        throw new Error("Post introuvable");
    }

    await verifyMember(post.groupId, userId);

    return prisma.comment.create({
        data: {
            postId,
            auteurId: userId,
            contenu: data.contenu
        }
    });
}


/// !!!!!!!!!!!! as soon as they ask to join they are considered a member!!!!!!!!!