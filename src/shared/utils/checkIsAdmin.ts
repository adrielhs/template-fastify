import { ProfileRepository } from "@modules/profiles/repositories/profile.repository"
import type { UsersRepository } from "@modules/users/repositories/users-repository"
import { AppError, NotFoundError } from "@shared/error/AppError"

export class CheckIfUserIsAdmin {
  constructor(
    private profileRepository: ProfileRepository,
    private userRepository: UsersRepository,
  ) {}

  async checkIsAdmin(user_id: number): Promise<boolean> {
    const isAdmin = await this.profileRepository.checkIfUserIsAdmin(user_id)

    return Boolean(isAdmin)
  }

  async checkIsAdminAndReturnUser(user_id: number) {
    const user = await this.userRepository.getUserById(user_id)

    if (!user) {
      throw new NotFoundError("User Not Found")
    }

    if (user.status === false) {
      throw new AppError("User Is Inactivated")
    }

    const isAdmin =
      user.profile?.is_admin === true && user.profile?.status === true

    if (!isAdmin) {
      throw new AppError("Access Denied. Only Admins can do this action")
    }

    return user
  }
}
