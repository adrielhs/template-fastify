import { AppError } from "@shared/error/AppError"
import { UsersRepository } from "../repositories/users-repository"
import { compareHashPasswords } from "@shared/helper/encrypt"

interface IProps {
  email: string
  password: string
}

export class LoginUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: IProps) {
    const user = await this.usersRepository.getByEmail(email)

    if (!user) {
      throw new AppError("User not found", 400)
    }

    if (!user.password_hash) {
      throw new AppError("User password not set", 400)
    }

    const isPasswordMatch = await compareHashPasswords(
      password,
      user.password_hash,
    )
    if (!isPasswordMatch) {
      throw new AppError("Invalid credentials", 401)
    }

    const userResult = await this.usersRepository.getUserById(user.id)

    return { user: userResult }
  }
}
