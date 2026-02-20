import { UsersRepository } from "../repositories/users-repository"
import { AppError } from "@shared/error/AppError"
import { MailProvider } from "@shared/helper/mail"
import { v4 as uuid } from "uuid"
import { passwordRecovery } from "@shared/helper/mail/templates/passwordRecovery"
import { mailQueue } from "@shared/helper/jobs/queues/mail.queue"
import { env } from "@shared/env"

export class ForgetPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(email: string) {
    const user = await this.usersRepository.getByEmail(email)
    if (!user) {
      throw new AppError("User not found", 400)
    }

    const token = uuid()

    const html = passwordRecovery

    await this.usersRepository.saveTokenInDb(token, user.id)

    await mailQueue.add(
      "Forgot Password Email",
      {
        to: email,
        subject: "Recuperar senha anything",
        template: html(`${env.FRONTEND_URL}/reset-password/${token}`),
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
  }
}
