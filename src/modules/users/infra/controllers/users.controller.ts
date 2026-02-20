import { FastifyRequest, FastifyReply } from "fastify"
import { z, ZodError } from "zod"

import { makeCreateUserUseCase } from "@modules/users/use-cases/factories/make-create-user-use-case"
import { makeCheckMailUseCase } from "@modules/users/use-cases/factories/make-check-email-use-case"
import { makeUpdateUserUseCase } from "@modules/users/use-cases/factories/make-update-update-users-use-case"
import { makeSoftDeleteUserUseCase } from "../../use-cases/factories/make-soft-delete-user-use-case"
import { makeDeleteUserUseCase } from "../../use-cases/factories/make-export-delete-user"
import { makeGetAllUsersUseCase } from "@modules/users/use-cases/factories/make-get-all-users-use-case"
import { makeExportUserXlsxUseCase } from "@modules/users/use-cases/factories/make-export-users-xlsx"
import { makeUpdateUserForAdminUseCase } from "@modules/users/use-cases/factories/make-update-user-for-admin"
import { NotFoundError } from "../../../../shared/error/AppError"
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { IDirection } from "@shared/dtos/commons"
import { AppError } from "@shared/error/AppError"

export enum IOrderBy {
  ID_PROFILE = "id_profile",
  STATUS = "status",
  WHATSAPP = "whatsapp",
  NAME = "name",
}

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const schema = z.object({
      name: z.string().min(1),
      email: z
        .string()
        .email()
        .refine((val) => val.endsWith("@anything.com"), {
          message: "The email must be from @anything.com domain",
        }),
      whatsapp: z
        .string()
        .min(11)
        .max(15)
        .regex(/^[0-9]+$/),
      id_profile: z.number().min(1).default(4).optional(),
      avatar: z.string().url("URL must be valid").optional(),
      status: z.boolean().optional(),
    })

    const data = schema.parse(request.body)

    const createUserUseCase = makeCreateUserUseCase()

    const user = await createUserUseCase.execute(data)

    return reply.status(201).send({
      message: "User created with success",
    })
  } catch (error) {
    if (error instanceof AppError) {
      return reply.status(400).send({ message: error.message })
    }
    if (error instanceof ZodError) {
      return reply.status(400).send({ message: error.issues })
    }

    return reply.status(500).send({
      message: "INTERNAL SERVER ERROR: FAILED TO CREATE THE USER" + error,
    })
  }
}

export async function updateUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const paramsSchema = z.object({
      id: z.coerce.number(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      name: z.string().optional(),
      whatsapp: z.string().optional(),
      email: z
        .string()
        .email()
        .refine((val) => val.endsWith("@anything.com"), {
          message: "The email must be from @anything.com domain",
        })
        .optional(),
      avatar: z.string().optional(),
      id_profile: z.number().optional(),
    })
    const { name, whatsapp, email, avatar, id_profile } = bodySchema.parse(
      request.body,
    )
    const updateUser = makeUpdateUserUseCase()

    const updatedUser = await updateUser.execute({
      name,
      id_profile,
      id,
      whatsapp,
      email,
      avatar,
    })
    return reply.status(200).send({ data: updatedUser })
  } catch (error) {
    if (error instanceof AppError) {
      return reply.status(400).send({ message: error.message })
    }
    if (error instanceof ZodError) {
      return reply.status(400).send({ message: error.issues })
    }
    return reply.status(500).send({ message: " INTERNAL SERVER ERROR " })
  }
}

export async function updateUsersForAdmin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const paramsSchema = z.object({
      id: z.coerce.number(),
    })
    const { id } = paramsSchema.parse(request.params)

    const user_id = request.user?.sub || (request as any).user?.sub

    if (!user_id) {
      return reply.status(401).send({
        message: "Unauthorized - User not authenticated",
      })
    }

    const bodySchema = z.object({
      name: z.string().optional(),
      whatsapp: z.string().optional(),
      email: z
        .string()
        .email()
        .refine((val) => val.endsWith("@anything.com"), {
          message: "The email must be from @anything.com domain",
        })
        .optional(),
      avatar: z.string().optional(),
      id_profile: z.coerce.number().optional(),
      status: z.coerce.boolean().optional(),
    })

    const bodyData = bodySchema.parse(request.body || {})

    const { name, id_profile, whatsapp, email, avatar, status } = bodyData

    const updateUserForAdmin = makeUpdateUserForAdminUseCase()

    const updatedUser = await updateUserForAdmin.execute(Number(user_id), {
      id,
      name,
      whatsapp,
      email,
      avatar,
      id_profile,
      status,
    })

    console.log("✅ Resposta do use case:", updatedUser)

    return reply.status(200).send({ data: updatedUser })
  } catch (error) {
    console.error("Erro completo:", error)

    if (error instanceof AppError) {
      return reply.status(error.statusCode || 400).send({
        message: error.message,
      })
    }
    if (error instanceof ZodError) {
      return reply.status(400).send({ message: error.issues })
    }

    return reply.status(500).send({
      message: "INTERNAL SERVER ERROR",
    })
  }
}

export async function softDeleteUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const paramsSchema = z.object({
      id: z.coerce.number(),
      is_admin: z.coerce.boolean(),
    })

    const { id, is_admin } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      status: z.coerce.boolean(),
    })

    const { status } = bodySchema.parse(request.body)

    const softDelete = makeSoftDeleteUserUseCase()

    const softDeletedUser = await softDelete.execute({
      id,
      is_admin,
      status,
    })
    return reply.status(200).send({ data: softDeletedUser })
  } catch (error) {
    if (error instanceof AppError) {
      return reply.status(400).send({ message: error.message })
    }
    if (error instanceof ZodError) {
      return reply.status(200).send({ message: error.issues })
    }
    return reply.status(500).send({ message: " INTERNAL SERVER ERROR " })
  }
}

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const params = z.object({ id: z.coerce.number() })

    const { id } = params.parse(request.params)

    const schemaBody = z
      .object({
        scheduled_for_email: z.string().email().optional(),
      })
      .optional()

    const body = schemaBody.parse(request.body)

    const usersRepository = new PrismaUsersRepository()

    const loggedUser = await usersRepository.getUserById(id)

    if (!loggedUser) {
      return reply.status(404).send({
        error: "User not found",
        message: "The User was not founded",
      })
    }

    let targetUserId = id

    if ([1, 2].includes(loggedUser.id_profile) && body?.scheduled_for_email) {
      const targetUser = await usersRepository.getByEmail(
        body.scheduled_for_email,
      )

      if (!targetUser) {
        throw new NotFoundError("User with this email was not founded")
      }
      if ([1, 2].includes(targetUser.id_profile)) {
        throw new AppError("This user cannot be deleted")
      }

      const deleteUser = makeDeleteUserUseCase()

      const deleteUsers = await deleteUser.execute(targetUserId)

      return deleteUsers
    }} catch (error) {
      if (error instanceof AppError) {
        return reply.status(400).send({ message: error.message })
      }
      if (error instanceof NotFoundError) {
        return reply.status(404).send({ message: error.message })
      }
      if (error instanceof ZodError) {
        return reply.status(400).send({ message: error.issues })
      }
      return reply.status(500).send({ message: "INTERNAL SERVER ERROR", error })
    }
  }

export async function getAllUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const querySchema = z.object({
      page: z.coerce.number().catch(1),
      limit: z.coerce.number().catch(10),
      queryString: z.string().catch(""),
      orderBy: z.nativeEnum(IOrderBy).catch(IOrderBy.NAME),
      direction: z.nativeEnum(IDirection).catch(IDirection.ASC),
      id_profile: z.coerce.number().optional(),
    })

    const { page, limit, orderBy, direction, queryString, id_profile } =
      querySchema.parse(request.query)

    const GetAllUsers = makeGetAllUsersUseCase()

    const result = await GetAllUsers.execute(
      { page, limit },
      { orderBy, direction },
      queryString,
      id_profile,
    )
    return reply.status(200).send({ data: result })
  } catch (error) {
    if (error instanceof AppError) {
      return reply.status(400).send({ message: error.message })
    }
    if (error instanceof ZodError) {
      console.error("Zod Validation Error:", error.issues)
      return reply.status(400).send({ message: error.issues })
    }
    return reply.status(500).send({ message: " INTERNAL SERVER ERROR " })
  }
}

export async function checkMail(request: FastifyRequest, reply: FastifyReply) {
  try {
    const schema = z.object({ token: z.string() })

    const { token } = schema.parse(request.body)

    const checkMail = makeCheckMailUseCase()

    const mailChecked = await checkMail.execute(token)

    return reply.send({ data: mailChecked })
  } catch (error) {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ message: error.message })
    }
    if (error instanceof ZodError) {
      return reply.status(400).send({ message: error.issues })
    }
    return reply.status(500).send({ message: "INTERNAL SERVER ERROR" })
  }
}

export async function exportUserXlsx(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const paramsSchema = z.object({
      user_id: z.coerce.number(),
    })

    const { user_id } = paramsSchema.parse(request.params)
    const exportUser = makeExportUserXlsxUseCase()

    const userExported = await exportUser.execute(user_id, {
      id: 0,
      id_profile: 0,
      name: "",
      email: "",
      whatsapp: "",
      avatar: "",
      mail_ok: false,
      status: true,
    })

    return reply.status(201).send({ message: "Xlsx exportado", userExported })
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "INTERNAL SERVER ERROR" + error })
  }
}
