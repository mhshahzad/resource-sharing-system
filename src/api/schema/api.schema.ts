import { z } from "zod";

export const apiSourceSchema = z.enum(["api", "cache"]);
export type ApiSource = z.infer<typeof apiSourceSchema>;

export const apiMetaSchema = z.object({
  source: apiSourceSchema,
  fetchedAt: z.string().datetime(),
});

export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown(),
  meta: apiMetaSchema,
});

export type ApiMeta = z.infer<typeof apiMetaSchema>;
export type ApiResponse = z.infer<typeof apiResponseSchema>;
