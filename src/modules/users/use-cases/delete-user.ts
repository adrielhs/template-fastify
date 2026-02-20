import { AppError } from "@shared/error/AppError"
import { UsersRepository } from "../repositories/users-repository"
import { ProfileRepository } from "@modules/profiles/repositories/profile.repository"

export interface IDeleteUserProps {
  id: number
}

export class DeleteUsersUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private profileRepository: ProfileRepository,
  ) {}

  async execute(id: number) {
    const user = await this.usersRepository.getUserById(id)

    if (!user) {
      throw new AppError("User not found")
    }

    const profile = await this.profileRepository.findProfileById(
      user.id_profile,
    )

    if (profile?.is_superAdmin === true) {
      throw new AppError("Super Admin users cannot be deleted")
    }

    return this.usersRepository.deleteUsers(id)
  }
}
