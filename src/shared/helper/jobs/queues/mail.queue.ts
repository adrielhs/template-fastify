import { Queue } from "bullmq"
import { redisClient } from "@shared/infra/redis"
import { env } from "@shared/env/index"

import type { IMailProps } from "../../mail/IMailProvider"

const mailQueue = new Queue<IMailProps>("email-queue", {
  connection: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  },
  defaultJobOptions: {
    removeOnComplete: {
      count: 100,
      age: 24 * 3600,
    },
    removeOnFail: {
      count: 50,
      age: 7 * 24 * 3600,
    },
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
  },
})

export { mailQueue }
