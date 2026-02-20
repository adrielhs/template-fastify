import { AppError } from "@shared/error/AppError"
import { UsersRepository } from "../repositories/users-repository"
import { generateHashPassword, generateToken } from "@shared/helper/encrypt"
import { mailQueue } from "@shared/helper/jobs/queues/mail.queue"
import { welcomeEmail } from "@shared/helper/mail/templates/welcomeEmail"
import { env } from "@shared/env"

export interface ICreateUserProps {
  name: string
  email: string
  whatsapp: string
  id_profile?: number
  avatar?: string
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: ICreateUserProps) {
    const { name, email, whatsapp, id_profile, avatar } = data

    const existingEmail = await this.usersRepository.getByEmail(email)
    if (existingEmail) {
      throw new AppError("Email already in use")
    }

    const existingWhatsapp =
      await this.usersRepository.getWhatsappUser(whatsapp)
    if (existingWhatsapp) {
      throw new AppError("Whatsapp already exists")
    }

    const hashedPassword = await generateHashPassword(email)
    const token = await generateToken()

    const user = await this.usersRepository.createUsers(
      { name, email, whatsapp, id_profile, avatar },
      token,
      hashedPassword,
    )

    await mailQueue.add(
      "send welcome email",
      {
        to: user.email,
        subject: "[ Anything] Token para seu cadastro inicial!",
        template: welcomeEmail(
          user.name,
          `${env.FRONTEND_URL}/reset-password/${token}`,
        ),
        priority: 5,
      },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
      },
    )

    return user
  }
}
