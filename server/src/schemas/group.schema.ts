import { z } from "zod";


export const createGroupSchema = z.object({

    nom: z
        .string()
        .min(1, "Le nom est obligatoire"),

    theme: z
        .string()
        .min(1, "Le thème est obligatoire"),

    description: z
        .string()
        .min(1, "La description est obligatoire"),

    regles: z
        .string()
        .min(1, "Les règles sont obligatoires"),

    visibilite: z
        .enum([
            "PUBLIC",
            "PRIVE"
        ])
        .default("PUBLIC")
});

export type CreateGroupInput =
    z.infer<typeof createGroupSchema>;


export const createPostSchema = z.object({

    contenu: z
        .string()
        .min(1, "Le contenu est obligatoire"),

    visibilite: z
        .boolean()
        .optional()
});

export type CreatePostInput =
    z.infer<typeof createPostSchema>;


export const createCommentSchema = z.object({

    contenu: z
        .string()
        .min(1, "Le commentaire est obligatoire")
});

export type CreateCommentInput =
    z.infer<typeof createCommentSchema>;


export const updateRequestSchema = z.object({

    statut: z.enum([
        "ACCEPTEE",
        "REFUSEE"
    ])
});

export type UpdateRequestInput =
    z.infer<typeof updateRequestSchema>;