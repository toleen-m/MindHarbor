import { z } from "zod";

export const createResourceSchema = z.object({
    titre: z
        .string()
        .min(1, "Le titre est obligatoire"),

    contenu: z
        .string()
        .optional(),

    categorie: z.enum([
        "ANXIETE",
        "SOMMEIL",
        "RELATIONS",
        "TRAVAIL",
        "DEUIL",
        "AUTRE"
    ]),

    type: z.enum([
        "ARTICLE",
        "EXERCICE",
        "FICHE_PRATIQUE",
        "AUDIO",
        "VIDEO",
        "LIEN_EXTERNE"
    ]),

    duree: z
        .number()
        .int()
        .positive()
        .optional(),

    niveau: z
        .enum([
            "DEBUTANT",
            "INTERMEDIAIRE",
            "AVANCE"
        ])
        .default("DEBUTANT")
});

export type CreateResourceInput =
    z.infer<typeof createResourceSchema>;