import { z } from "zod";

export const ResourceRuleSchema = z.object({
  id: z.string(),
  resourceId: z.string(),
  userId: z.array(z.string()).optional(),
  groupId: z.array(z.string()).optional(),
  everyId: z.boolean().optional(),
  permissions: z.array(z.enum(["read", "write", "admin"])),
});

export type ResourceRule = z.infer<typeof ResourceRuleSchema>;

