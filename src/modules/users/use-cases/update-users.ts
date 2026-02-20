import { UsersRepository } from "../repositories/users-repository"
import { AppError } from "@shared/error/AppError"
import { CheckIfUserIsAdmin } from "@shared/utils/checkIsAdmin"

export interface IUpdateUserProps {
  name?: string
  id: number
  email?: string
  avatar?: string
  whatsapp?: string
  id_profile?: number
}

export class UpdateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private checkIsAdmin: CheckIfUserIsAdmin,
  ) {}

  async execute(data: IUpdateUserProps) {
    const user = await this.usersRepository.getUserById(data.id)

    if (!user) {
      throw new AppError("User not found")
    }

    if (data.email && data.email !== user.email) {
      const existingEmail = await this.usersRepository.getByEmail(data.email)

      if (existingEmail && existingEmail.id !== user.id) {
        throw new AppError("Email already existis")
      }
    }

    if (data.whatsapp && data.whatsapp !== user.whatsapp) {
      const existingWhatsapp = await this.usersRepository.getWhatsappUser(
        data.whatsapp,
      )

      if (existingWhatsapp && existingWhatsapp.id !== user.id) {
        throw new AppError("Whatsapp Already Existis")
      }
    }

    const updatedUser = await this.usersRepository.updateUser({
      name: data.name ?? user.name,
      id: user.id,
      email: data.email ?? user.email,
      whatsapp: data.whatsapp ?? user.whatsapp,
      id_profile: data.id_profile ?? user.id_profile,
      avatar: data.avatar ?? user.avatar,
    })

    return updatedUser
  }
}
