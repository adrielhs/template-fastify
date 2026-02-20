import { AppError } from "@shared/error/AppError"
import { UsersRepository } from "../repositories/users-repository"

export class CheckMailUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(token: string) {
    const user = await this.usersRepository.getUserByToken(token)
    if (!user) throw new AppError("Invalid token, please create a new token")

    const userUpdated = await this.usersRepository.updateAfterCheckMail(user.id)

    return userUpdated
  }
}
