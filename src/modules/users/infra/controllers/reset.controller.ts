import { makeResetPasswordCase } from "@modules/users/use-cases/factories/make-reset-password-case"
import { AppError } from "@shared/error/AppError"
import { FastifyRequest, FastifyReply } from "fastify"

import { z, ZodError } from "zod"

export async function resetPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const schemaBody = z.object({
      password: z.string().min(6),
    })

    const schemaParams = z.object({
      token: z.string(),
    })

    const { token } = schemaParams.parse(request.params)
    const { password } = schemaBody.parse(request.body)

    const resetPassword = makeResetPasswordCase()

    await resetPassword.execute({
      token,
      password,
    })

    return reply.send({
      data: "password Has bean updated",
    })
  } catch (error: unknown) {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ message: error.message })
    }
    if (error instanceof ZodError) {
      return reply.status(400).send({ message: error.issues })
    }
    return reply
      .status(500)
      .send({ message: "INTERNAL SERVER ERROR:  " + error })
  }
}
