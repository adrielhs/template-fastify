import { Worker, Job } from "bullmq"
import { env } from "@shared/env/index"
import { logger } from "@shared/helper/logger"
import { MailProvider } from "../../../mail/index"
import { IMailProps } from "../../../mail/IMailProvider"

const mailProvider = new MailProvider()

const mailWorker = new Worker<IMailProps>(
  "email-queue",
  async (job: Job<IMailProps>) => {
    const { to, subject, template, priority } = job.data

    logger.info(`Processando email para: ${to}`)

    try {
      await mailProvider.sendMail({
        to,
        subject,
        template,
        priority,
      })

      logger.info(`Email enviado com sucesso para: ${to}`)
      return { success: true, to }
    } catch (error) {
      logger.error(`Erro ao enviar email para ${to}:`, error)
      throw error
    }
  },
  {
    connection: {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
    },
    concurrency: 5,
    removeOnComplete: {
      count: 100,
      age: 24 * 3600,
    },
    removeOnFail: {
      count: 50,
      age: 7 * 24 * 3600,
    },
  },
)

mailWorker.on("completed", (job) => {
  logger.info(`Job ${job.id} completado`)
})

mailWorker.on("failed", (job, err) => {
  logger.error(`Job ${job?.id} falhou:`, err)
})

mailWorker.on("error", (err) => {
  logger.error("Erro no worker:", err)
})

export { mailWorker }
