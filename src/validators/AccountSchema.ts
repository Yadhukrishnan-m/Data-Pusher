import { z } from "zod";

export const createAccountSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  website: z.string().optional(),
});

export const updateAccountSchema = z.object({
  name: z.string().min(3).optional(),
  website: z.string().optional(),
});
