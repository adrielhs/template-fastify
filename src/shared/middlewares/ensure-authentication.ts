import { FastifyRequest } from "fastify"

export const ensureAuthentication = async (request: FastifyRequest) => {
  await request.jwtVerify()
}
