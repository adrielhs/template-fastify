import { CheckIfUserIsAdmin } from "@shared/utils/checkIsAdmin"
import { ProfileRepository } from "@modules/profiles/repositories/profile.repository"
import type { UsersRepository } from "@modules/users/repositories/users-repository"
import { AppError, NotFoundError } from "@shared/error/AppError"

export class CheckIfUserIsSuperAdmin {
  constructor(
    private profileRepository: ProfileRepository,
    private userRepository: UsersRepository,
  ) {}

  async checkIfIsSuper(user_id: number): Promise<boolean> {
    const isSuper =
      await this.profileRepository.CheckIfUserIsSuperAdmin(user_id)

    return Boolean(isSuper)
  }

  async CheckIfIsSuperAdminAndReturnUser(user_id: number) {
    const user = await this.userRepository.getUserById(user_id)

    if (!user) throw new NotFoundError("User not Found")

    if (user.status === false) throw new AppError("User is not activated")

    const is_superAdmin =
      user.profile?.is_superAdmin === true && user.profile?.status === true

    if (!is_superAdmin) {
      throw new AppError("Access denied. Only SuperAdmins can do this action  ")
    }
    return user
  }
}
