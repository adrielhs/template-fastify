import { PrismaProfileRepository } from "@modules/profiles/repositories/prisma/prisma-profiles.repository"
import { PrismaUsersRepository } from "@modules/users/repositories/prisma/prisma-users-repository"
import { CheckIfUserIsAdmin } from "@shared/utils/checkIsAdmin"
import { PreHandlerChecker } from "../preHandlerIsAdmin"

export function makeCheckIsAdminUseCase() {
  const profileRepository = new PrismaProfileRepository()
  const usersRepository = new PrismaUsersRepository()

  const checkIfIsAdmin = new CheckIfUserIsAdmin(
    profileRepository,
    usersRepository,
  )
  const preHandler = new PreHandlerChecker(profileRepository, usersRepository)

  return {
    checkIfIsAdmin,
    preHandlerFunction: preHandler.asPreHandler(),
  }
}
