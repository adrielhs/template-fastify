import { PrismaProfileRepository } from "@modules/profiles/repositories/prisma/prisma-profiles.repository"
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { DeleteUsersUseCase } from "../delete-user"

export function makeDeleteUserUseCase() {
  const userRepository = new PrismaUsersRepository()
  const profileRepository = new PrismaProfileRepository()
  const deleteuserUseCase = new DeleteUsersUseCase(
    userRepository,
    profileRepository,
  )

  return deleteuserUseCase
}
