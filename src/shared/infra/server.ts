import { app } from "./app"
import { env } from "../env"
import { logger } from "@shared/helper/logger"
import { connectRedis } from "./redis"
import { startWorkers } from "@shared/helper/jobs/queues/workers"
import "@shared/helper/jobs/Cron-jobs/updateStatus.jobs"

export async function startServer() {
  try {
    await connectRedis()

    await startWorkers()

    await app.listen({
      host: "0.0.0.0",
      port: env.PORT,
    })

    logger.info(`🔥 HTTP Server Running on PORT: ${env.PORT}!`)
  } catch (error) {
    logger.error("Error starting server:", error)
    process.exit(1)
  }
}

startServer()
