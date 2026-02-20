import "@fastify/jwt"

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      sub: string
      id: number
      email?: string
      profile: { is_admin: boolean }
    }
  }
}
