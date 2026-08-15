import { z } from "zod";

export const createJournalSchema = z.object({

  humeurGenerale: z.number().int().min(1).max(5),

  niveauEnergie: z.number().int().min(1).max(5),

  qualiteDuSommeil: z.number().int().min(1).max(5),

  niveauAnxiete: z.number().int().min(1).max(5),

  evenementMarquants: z.string().max(2000),

  gratitude: z.string().max(500).optional(),

  activityIds: z.array(z.string())
});

export const updateJournalSchema =
  createJournalSchema.partial();

export type CreateJournalInput =
  z.infer<typeof createJournalSchema>;

export type UpdateJournalInput =
  z.infer<typeof updateJournalSchema>;