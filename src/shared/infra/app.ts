import fastify from "fastify"
import { AppError } from "@shared/error/AppError"
import { ZodError } from "zod"
import fastifyJwt from "@fastify/jwt"
import cors from "@fastify/cors"
import { env } from "../env"
import { routes } from "../infra/routes"
import { logger } from "@shared/helper/logger"

const app = fastify()

// 1. CORS PRIMEIRO (antes de tudo)
app.register(cors, {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Authorization",
    "Content-Type",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
})

// 2. JWT depois
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

// 3. Rotas por último
app.register(routes)

// 4. UM ÚNICO error handler combinado
app.setErrorHandler((error, _, reply) => {
  // Primeiro checa ZodError
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation Error", issues: error.format() })
  }

  // Depois AppError
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ message: error.message })
  }

  // Por último, erro genérico
  logger.error(error)
  return reply.status(error.statusCode || 500).send({ message: error.message })
})

export { app }
