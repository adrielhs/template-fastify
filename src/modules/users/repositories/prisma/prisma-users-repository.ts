import { prisma } from "@config/prisma"

import { UsersRepository } from "../users-repository"
import { ICreateUserProps } from "@modules/users/use-cases/create-user"
import { IPagination, IOrderBy } from "@shared/dtos/commons"
import { IUpdateUserProps } from "@modules/users/use-cases/update-users"
import { IUpdateUserForAdminProps } from "@modules/users/use-cases/update-user-for-admin"

export class PrismaUsersRepository implements UsersRepository {
  async getByEmail(email: string) {
    return await prisma.users.findUnique({
      where: { email },
    })
  }

  async createUsers(
    data: ICreateUserProps,
    token: string,
    hashedPassword: string,
  ) {
    const user = await prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        whatsapp: data.whatsapp,
        avatar: data.avatar ?? null,
        password_hash: hashedPassword ?? null,
        valid_mail_token: token,
        password_reset_token: token,
      },
    })
    return user
  }

  async saveTokenInDb(token: string, user_id: number) {
    await prisma.$transaction(async (trx) => {
      const result = await trx.users.update({
        where: { id: user_id },
        data: {
          password_reset_token: token,
        },
      })
      console.log("Token salvo na tabela users:", result.password_reset_token)

      await trx.tokens.create({
        data: {
          token,
          user_id,
          createdAt: new Date(),
        },
      })
    })
  }

  async getUserByToken(token: string) {
    return prisma.tokens.findFirst({
      where: { token },
    })
  }

  async updatePasswordAndDeleteTokens(id_user: number, password: string) {
    await prisma.$transaction(async (trx) => {
      await trx.users.update({
        data: {
          password_hash: password,
          password_reset_token: null,
          password_reset_expires: null,
        },
        where: {
          id: id_user,
        },
      })

      await trx.tokens.deleteMany({
        where: {
          user_id: id_user,
        },
      })
    })
  }

  async getUserById(id: number) {
    const user = await prisma.users.findUnique({
      where: { id },
      include: { profile: true },
    })

    return user
  }

  async getAllUsers(
    pagination: IPagination,
    orderByParams: IOrderBy,
    queryString: any,
    id_profile: number,
  ) {
    const { limit, page } = pagination
    const skip = (page - 1) * limit

    const where: any = {}

    if (id_profile) {
      where.id_profile = id_profile
    }

    if (queryString) {
      where.OR = [
        { name: { contains: queryString, mode: "insensitive" } },
        { email: { contains: queryString, mode: "insensitive" } },
        { whatsapp: { contains: queryString, mode: "insensitive" } },
      ]
    }

    const totalUsers = await prisma.users.count({ where })
    const totalPages = await Math.ceil(totalUsers / limit)

    const usersRaw = await prisma.users.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [orderByParams.orderBy]: orderByParams.direction },
    })

    return { totalUsers, totalPages, usersRaw }
  }

  async getWhatsappUser(whatsapp: string) {
    const user = await prisma.users.findFirst({
      where: { whatsapp },
    })

    return user
  }

  async updateUser(data: IUpdateUserProps) {
    const user = await prisma.users.update({
      where: { id: data.id },
      data: {
        name: data.name,
        avatar: data.avatar,
        whatsapp: data.whatsapp,
        email: data.email,
        id_profile: data.id_profile,
      },
      select: {
        avatar: true,
        email: true,
        password_hash: false,
        valid_mail_token: false,
        name: true,
        whatsapp: true,
      },
    })
    return user
  }

  async updateUserForAdmin(data: IUpdateUserForAdminProps) {
    console.log("💾 REPOSITORY - Dados que vão para o Prisma:", {
      where: { id: data.id },
      data: {
        name: data.name,
        avatar: data.avatar,
        whatsapp: data.whatsapp,
        email: data.email,
        id_profile: data.id_profile,
        status: data.status,
      },
    })

    const user = await prisma.users.update({
      where: { id: data.id },
      data: {
        name: data.name,
        avatar: data.avatar,
        whatsapp: data.whatsapp,
        email: data.email,
        id_profile: data.id_profile,
        status: data.status,
      },
      select: {
        id: true,
        avatar: true,
        email: true,
        name: true,
        whatsapp: true,
        id_profile: true,
        status: true,
      },
    })

    console.log("✅ REPOSITORY - Prisma retornou:", user)

    return user
  }

  async softDeleteUser(id: number, status: boolean) {
    const softDeletedUser = await prisma.users.update({
      where: { id },
      data: {
        status,
      },
    })
    return softDeletedUser
  }

  async deleteUsers(id: number) {
    return await prisma.users.delete({
      where: { id },
    })
  }

  async updateAfterCheckMail(user_id: number) {
    await prisma.users.update({
      where: {
        id: user_id,
      },
      data: {
        mail_ok: true,
      },
    })
  }

  async getPasswordUser(user_id: number) {
    const password = await prisma.users.findFirst({
      where: {
        id: user_id,
      },
      select: {
        password_hash: true,
      },
    })

    return password
  }

  async getUserByName(name: string) {
    const result = await prisma.users.findFirst({
      where: { name },
    })
    return result
  }

  async createPassword(password: string, userId: number) {
    await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        password_hash: password,
        valid_mail_token: null,
      },
    })
  }

  async getUserToken(token: string) {
    const userToken = await prisma.users.findFirst({
      where: {
        password_reset_token: token,
      },
    })

    return userToken
  }

  async usersToXlsx() {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        id_profile: true,
        name: true,
        email: true,
        whatsapp: true,
        avatar: true,
        mail_ok: true,
        status: true,
      },
    })

    return users
  }
}
