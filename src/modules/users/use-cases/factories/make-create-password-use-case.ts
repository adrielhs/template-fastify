import { PrismaUsersRepository } from "@modules/users/repositories/prisma/prisma-users-repository"
import { CreatePasswordUseCase } from "../create-password"

export function makeCreatePasswordUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()

  const createPasswordUseCase = new CreatePasswordUseCase(prismaUsersRepository)

  return createPasswordUseCase
}
