import { UsersRepository } from "../repositories/users-repository"
import { AppError } from "@shared/error/AppError"
import { CheckIfUserIsAdmin } from "@shared/utils/checkIsAdmin"

export interface IUpdateUserForAdminProps {
  id: number
  name?: string
  email?: string
  avatar?: string
  whatsapp?: string
  id_profile?: number
  status?: boolean
}

export class UpdateUserForAdminUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private checkIsAdmin: CheckIfUserIsAdmin,
  ) {}

  async execute(user_id: number, data: IUpdateUserForAdminProps) {
    const checkIfIsAdmin = await this.checkIsAdmin.checkIsAdmin(user_id)
    if (!checkIfIsAdmin) {
      throw new AppError("Access denied", 403)
    }

    const userToUpdate = await this.usersRepository.getUserById(data.id)
    if (!userToUpdate) {
      throw new AppError("User not found", 404)
    }

    // ADICIONE ESTES LOGS
    console.log("🔧 USE CASE - data recebido:", data)
    console.log(
      "🔧 USE CASE - data.status:",
      data.status,
      "Type:",
      typeof data.status,
    )
    console.log("🔧 USE CASE - userToUpdate.status:", userToUpdate.status)

    if (data.name && data.name !== userToUpdate.name) {
      const existsName = await this.usersRepository.getUserByName(data.name)
      if (existsName && existsName.id !== data.id) {
        throw new AppError("Name already exists", 409)
      }
    }

    if (data.email && data.email !== userToUpdate.email) {
      const existingEmail = await this.usersRepository.getByEmail(data.email)
      if (existingEmail && existingEmail.id !== data.id) {
        throw new AppError("Email already exists", 409)
      }
    }

    if (data.whatsapp && data.whatsapp !== userToUpdate.whatsapp) {
      const existingWhatsapp = await this.usersRepository.getWhatsappUser(
        data.whatsapp,
      )
      if (existingWhatsapp && existingWhatsapp.id !== data.id) {
        throw new AppError("Whatsapp already exists", 409)
      }
    }

    const updateData: IUpdateUserForAdminProps = {
      id: userToUpdate.id,
      name: data.name ?? userToUpdate.name,
      email: data.email ?? userToUpdate.email,
      whatsapp: data.whatsapp ?? userToUpdate.whatsapp,
      avatar: data.avatar ?? userToUpdate.avatar,
      id_profile: data.id_profile ?? userToUpdate.id_profile,
      status: data.status !== undefined ? data.status : userToUpdate.status,
    }

    console.log("🔧 USE CASE - updateData montado:", updateData)
    console.log(
      "🔧 USE CASE - updateData.status:",
      updateData.status,
      "Type:",
      typeof updateData.status,
    )

    const adminUpdateUser =
      await this.usersRepository.updateUserForAdmin(updateData)

    return adminUpdateUser
  }
}
