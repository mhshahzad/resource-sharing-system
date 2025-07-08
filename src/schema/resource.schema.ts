import { z } from "zod";

export const ResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  metadata: z.record(z.any()).optional(),
});

export type Resource = z.infer<typeof ResourceSchema>;

