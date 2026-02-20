import { FastifyReply, FastifyRequest } from "fastify"
import { z, ZodError } from "zod"
import { AppError } from "@shared/error/AppError"

import { CheckIfUserIsAdmin } from "../checkIsAdmin"
import type { PreHandlerChecker } from "../preHandlerIsAdmin"

export class AdminController {
  constructor(
    private checkIfUserIsAdmin: CheckIfUserIsAdmin,
    private preHandler: PreHandlerChecker,
  ) {}

  asPreHandler() {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await this.preHandler.asPreHandler()
      } catch (error) {
        if (error instanceof AppError) {
          return reply
            .status(error.statusCode || 403)
            .send({ message: error.message })
        }
        return reply.status(500).send({ message: "INTERNAL SERVER ERROR" })
      }
    }
  }

  async getUserForAdmin(request: FastifyRequest, reply: FastifyReply) {
    try {
      const paramsSchema = z.object({
        user_id: z.coerce.number(),
      })
      const { user_id } = paramsSchema.parse(request.params)

      return reply.status(200).send({
        message: `Acesso permitido. Rota protegida por admin. Usuário ID: ${user_id}`,
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return reply.status(400).send({ message: error.issues })
      }
      return reply.status(500).send({ message: "INTERNAL SERVER ERROR" })
    }
  }
}
