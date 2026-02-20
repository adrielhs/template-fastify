import { FastifyRequest, FastifyReply } from "fastify"

import { z } from "zod"

import { makeLoginUseCase } from "../../use-cases/factories/make-login-use-case"
import { env } from "@shared/env"

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = schema.parse(request.body)

  const loginUseCase = makeLoginUseCase()

  const { user } = await loginUseCase.execute({ email, password })

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: user.id.toString(),
        expiresIn: env.JWT_EXPIRES_IN,
      },
    },
  )

  return reply.send({
    user: { ...user, password: undefined },
    token,
  })
}
