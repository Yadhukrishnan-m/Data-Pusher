import { z } from "zod";

export const createDestinationSchema = z.object({
  url: z.string().url(),
  method: z.enum(["GET", "POST", "PUT"]),
  headers: z.record(z.string(), z.string()),
});

export const updateDestinationSchema = createDestinationSchema.partial();
