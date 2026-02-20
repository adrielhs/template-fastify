import { UsersRepository } from "../repositories/users-repository"
import { IPagination, IOrderBy } from "@shared/dtos/commons"

export class GetAllUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    pagination: IPagination,
    orderBy: IOrderBy,
    q: string,
    id_profile: number,
  ) {
    const users = await this.usersRepository.getAllUsers(
      pagination,
      orderBy,
      q,
      id_profile,
    )
    return users
  }
}
