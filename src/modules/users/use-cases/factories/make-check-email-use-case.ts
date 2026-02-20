import { PrismaUsersRepository } from "@modules/users/repositories/prisma/prisma-users-repository"
import { CheckMailUseCase } from "../check-mail"

export function makeCheckMailUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()

  const checkMailUseCase = new CheckMailUseCase(prismaUsersRepository)

  return checkMailUseCase
}
