import "dotenv/config"

import { z } from "zod"

import { logger } from "@shared/helper/logger"
import { AppError } from "../error/AppError"

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  // CORS_ORIGINS: z.string().default("localhost:3340"),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().default(""),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
  SALT_RESULT: z.coerce.number().default(10),
  MAIL_HOST: z.string(),
  MAIL_SECURITY: z.coerce.boolean().default(false),
  MAIL_PORT: z.coerce.number().default(587),
  MAIL_USER: z.string(),
  MAIL_PASS: z.string(),
  MAIL_FROM: z.string(),
  FRONTEND_URL: z.string(),
  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.coerce.number().default(6379),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  logger.error("Invalid environment variable", _env.error.format())

  throw new AppError("❌ Invalid environment variables")
}

export const env = _env.data
