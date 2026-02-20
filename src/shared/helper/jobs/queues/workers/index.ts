import { logger } from "@shared/helper/logger"
import { mailWorker } from "./mail-worker"

export async function startWorkers() {
  try {
    logger.info("Iniciando workers...")

    logger.info("Worker de email iniciado")

    process.on("SIGTERM", async () => {
      logger.info("Recebido SIGTERM, fechando workers...")
      await mailWorker.close()
      process.exit(0)
    })

    process.on("SIGINT", async () => {
      logger.info("Recebido SIGINT, fechando workers...")
      await mailWorker.close()
      process.exit(0)
    })
  } catch (error) {
    logger.error("Erro ao iniciar workers:", error)
    process.exit(1)
  }
}
if (require.main === module) {
  startWorkers()
}
