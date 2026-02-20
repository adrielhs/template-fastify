import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { ExportUserXlsxUseCase } from "../export-users-to-xlsx"
import { CheckIfUserIsAdmin } from "@shared/utils/checkIsAdmin"
import { PrismaProfileRepository } from "@modules/profiles/repositories/prisma/prisma-profiles.repository"

export function makeExportUserXlsxUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const profileRepository = new PrismaProfileRepository()
  const checkIsAdmin = new CheckIfUserIsAdmin(
    profileRepository,
    prismaUsersRepository,
  )

  const exportUserXlsx = new ExportUserXlsxUseCase(
    prismaUsersRepository,
    checkIsAdmin,
  )

  return exportUserXlsx
}
