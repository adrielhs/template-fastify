import { AppError } from "@shared/error/AppError"
import { UsersRepository } from "../repositories/users-repository"
import { ProfileRepository } from "@modules/profiles/repositories/profile.repository"

export interface IDeleteUserProps {
  id: number
  status: boolean
  is_admin: boolean
}

export class SoftDeleteUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private profileRepository: ProfileRepository,
  ) {}

  async execute(data: IDeleteUserProps) {
    const user = await this.usersRepository.getUserById(data.id)

    const profile = await this.profileRepository.findProfileById(
      user.id_profile,
    )

    if (!profile?.is_admin) {
      throw new AppError("You do not have permission to perform this action")
    }

    if (!user) {
      throw new AppError("User not found")
    }

    if (user.status === data.status) {
      const action = data.status ? "activated" : "inactive"
      throw new AppError(`User is already ${action}`)
    }

    const updatedUser = await this.usersRepository.softDeleteUser(
      data.id,
      data.status,
    )

    return updatedUser
  }
}
