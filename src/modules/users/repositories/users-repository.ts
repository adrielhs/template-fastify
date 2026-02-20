import { Prisma, Tokens, Users } from "@prisma/client"

import { ICreateUserProps } from "../use-cases/create-user"
import { IUpdateUserProps } from "../use-cases/update-users"
import { IPagination, IOrderBy } from "@shared/dtos/commons"
import type { IUpdateUserForAdminProps } from "../use-cases/update-user-for-admin"

interface IPaginationUsers {
  totalPages: number
  totalUsers: number
}

export type GetResultUsers = Prisma.UsersGetPayload<{
  select: {
    name: true
    whatsapp: true
    avatar: true
    id: true
    id_profile: true
  }
}>

export interface UsersRepository {
  getUserById(id: number): Promise<any | null>
  getByEmail(email: string): Promise<Users | null>
  createUsers(
    data: ICreateUserProps,
    token: string,
    hashedPassword: string,
  ): Promise<Users>
  saveTokenInDb(token: string, id_user: number): Promise<void>
  updatePasswordAndDeleteTokens(
    id_user: number,
    password: string,
  ): Promise<void>
  getUserByToken(token: string): Promise<Tokens | null>
  getUserToken(token: string): Promise<Users | null>
  updateAfterCheckMail(user_id: number): Promise<void>
  updateUser(data: IUpdateUserProps): Promise<Users | any | null>
  updateUserForAdmin(
    data: IUpdateUserForAdminProps,
  ): Promise<Users | any | null>
  getAllUsers(
    pagination: IPagination,
    orderByParams: IOrderBy,
    queryString: any,
    id_profile: number,
  ): Promise<IPaginationUsers>
  getUserByName(name: string): Promise<Users | null>
  getWhatsappUser(whatsapp: string): Promise<Users | null>
  deleteUsers(id: number): Promise<Users>
  softDeleteUser(id: number, status: boolean): Promise<Users | null>
  createPassword(password: string, userId: number): Promise<void>
  usersToXlsx(
    id: number,
    id_profile: number,
    name: string,
    whatsapp: string,
    avatar: string | null,
    email: string,
    mail_ok: boolean,
    status: boolean,
  ): Promise<
    {
      id: number
      id_profile: number
      name: string
      email: string
      whatsapp: string
      avatar: string | null
      mail_ok: boolean
      status: boolean
    }[]
  >
}
