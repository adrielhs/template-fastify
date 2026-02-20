import { UsersRepository } from "../repositories/users-repository"
import { AppError } from "@shared/error/AppError"
import { generateHashPassword } from "../../../shared/helper/encrypt"

interface IResetRequest {
  token: string
  password: string
}

export class ResetPasswordCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(data: IResetRequest) {
    const userToken = await this.usersRepository.getUserToken(data.token)
    if (!userToken) {
      throw new AppError("Invalid or expired token")
    }
    console.log("Gerando hash da senha...")
    const passwordHashed = await generateHashPassword(data.password)
    console.log("Hash gerado com sucesso")

    const reset = {
      userId: userToken.id,
      password: passwordHashed,
    }

    const result = await this.usersRepository.updatePasswordAndDeleteTokens(
      reset.userId,
      reset.password,
    )

    return result
  }
}
