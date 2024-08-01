import { z } from "zod";

export const envSchema = z.object({
  GOOGLE_API_KEY: z.string(),
  SENTRY_AUTH_TOKEN: z.string(),
  SENTRY_ENABLED: z.enum(["true", "false"]).optional(),
});

envSchema.parse(process.env);
