import { PrismaUsersRepository } from "@modules/users/repositories/prisma/prisma-users-repository"
import { GetAllUsersUseCase } from "../get-all-users"

export function makeGetAllUsersUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()

  const getAllUsersUseCase = new GetAllUsersUseCase(prismaUsersRepository)

  return getAllUsersUseCase
}
