import { PrismaProfileRepository } from "@modules/profiles/repositories/prisma/prisma-profiles.repository"
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { SoftDeleteUserUseCase } from "../soft-delete-user"

export function makeSoftDeleteUserUseCase() {
  const userRepository = new PrismaUsersRepository()
  const profileRepository = new PrismaProfileRepository()
  const softDeleteuserUseCase = new SoftDeleteUserUseCase(
    userRepository,
    profileRepository,
  )

  return softDeleteuserUseCase
}
