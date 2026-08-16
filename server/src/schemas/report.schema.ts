import { z } from "zod";

export const createReportSchema = z.object({
    targetId: z.string().cuid(),
    categorie: z.enum([
        "INAPPROPRIE",
        "SPAM",
        "INQUIETANT"
    ]),
    raison: z.string().optional()
});

export const updateReportSchema = z.object({
    statut: z.enum([
        "TRAITE",
        "REJETE"
    ]),
    resolution: z.enum([
        "CONTENU_MASQUE",
        "AVERTISSEMENT",
        "REJETE"
    ])
});

export type CreateReportInput =
    z.infer<typeof createReportSchema>;

export type UpdateReportInput =
    z.infer<typeof updateReportSchema>;