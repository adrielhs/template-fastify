import { generateHashPassword } from "@shared/helper/encrypt"
import { UsersRepository } from "../repositories/users-repository"

export class CreatePasswordUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(password: string, token: string) {
    const user = await this.usersRepository.getUserByToken(token)

    const hashedPassword = await generateHashPassword(password)

    await this.usersRepository.createPassword(hashedPassword, user!.id)
  }
}
