import { PrismaUsersRepository } from "@modules/users/repositories/prisma/prisma-users-repository"
import { UpdateUserUseCase } from "../update-users"

export function makeUpdateUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()

  const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository)

  return updateUserUseCase
}
