import { UpdateUserForAdminUseCase } from "../update-user-for-admin"
import { PrismaUsersRepository } from "@modules/users/repositories/prisma/prisma-users-repository"
import { CheckIfUserIsAdmin } from "@shared/utils/checkIsAdmin"
import { PrismaProfileRepository } from "@modules/profiles/repositories/prisma/prisma-profiles.repository"

export function makeUpdateUserForAdminUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const profileRepository = new PrismaProfileRepository()
  const checkIsAdmin = new CheckIfUserIsAdmin(
    profileRepository,
    usersRepository,
  )
  const updateUserForAdmin = new UpdateUserForAdminUseCase(
    usersRepository,
    checkIsAdmin,
  )
  return updateUserForAdmin
}
