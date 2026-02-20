import { ProfileRepository } from "@modules/profiles/repositories/profile.repository"
import type { UsersRepository } from "@modules/users/repositories/users-repository"
import { FastifyRequest, FastifyReply } from "fastify"

export class PreHandlerChecker {
  constructor(
    private profileRepository: ProfileRepository,
    private userRepository: UsersRepository,
  ) {}

  asPreHandler() {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      if (!request.user) {
        return reply.status(401).send({ message: "User not authenticated" })
      }

      const userId = request.user.sub

      if (
        !userId ||
        (typeof userId !== "number" && typeof userId !== "string")
      ) {
        return reply.status(401).send({ message: "Invalid user ID" })
      }

      const numericUserId =
        typeof userId === "string" ? parseInt(userId) : userId

      if (isNaN(numericUserId)) {
        return reply
          .status(401)
          .send({ message: "User ID must be a valid number" })
      }

      try {
        const user = await this.userRepository.getUserById(numericUserId)

        if (!user) {
          return reply.status(404).send({ message: "User not found" })
        }

        if (!user.profile?.is_admin) {
          return reply
            .status(403)
            .send({ message: "Access denied - admin privileges required" })
        }
      } catch (error) {
        console.error("Error fetching user:", error)
        return reply.status(500).send({ message: "Internal server error" })
      }
    }
  }
}
