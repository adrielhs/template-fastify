import * as XLSX from "xlsx"
import fs from "fs"
import { UsersRepository } from "../repositories/users-repository"
import { CheckIfUserIsAdmin } from "@shared/utils/checkIsAdmin"
import { AppError } from "@shared/error/AppError"

interface IUsersToXlsx {
  id: number
  id_profile: number
  name: string
  email: string
  whatsapp: string
  avatar: string | null
  mail_ok: boolean
  status: boolean
}

export class ExportUserXlsxUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private checkIsAdmin: CheckIfUserIsAdmin,
  ) {}

  async execute(user_id: number, data: IUsersToXlsx) {
    const checkIfIsAdmin = await this.checkIsAdmin.checkIsAdmin(user_id)
    if (!checkIfIsAdmin) {
      throw new AppError("Access denied", 403)
    }

    const usersData = await this.usersRepository.usersToXlsx(
      data.id,
      data.id_profile,
      data.name,
      data.whatsapp,
      data.avatar,
      data.email,
      data.mail_ok,
      data.status,
    )

    if (!usersData || usersData.length === 0) {
      throw new AppError("No user data found to export", 404)
    }

    const worksheet = XLSX.utils.json_to_sheet(usersData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users")

    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" })
    fs.writeFileSync("users.xlsx", buffer)
  }
}
