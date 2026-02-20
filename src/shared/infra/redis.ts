import { createClient } from "redis"
import { env } from "../env/index"
import { logger } from "@shared/helper/logger"

const redisClient = createClient({
  url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`,
})

redisClient.on("error", (err) => console.error("Redis Client Error", err))

export async function connectRedis() {
  try {
    await redisClient.connect()
    return logger.info(`Redis is runnning on port: ${env.REDIS_PORT}`)
  } catch (error) {
    logger.error("Error to start redis", error)
  }
}

export { redisClient }
