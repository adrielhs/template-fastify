import { FastifyInstance } from "fastify"

import { authRoutes } from "@modules/users/infra/routes/auth.routes"
import { usersRoutes } from "@modules/users/infra/routes/users.routes"
import { forgotRoutes } from "@modules/users/infra/routes/forgot.routes"
import { resetRoutes } from "@modules/users/infra/routes/reset.routes"
import { vehiclesRoutes } from "@modules/vehicles/infra/routes/vehicles.routes"
import { profilesRoutes } from "@modules/profiles/infra/routes/profiles.routes"
import { scheduleRoutes } from "@modules/schedules/infra/routes/schedule.routes"
import { maintenanceRoutes } from "@modules/maintenance/infra/routes/maintenance.routes"

export async function routes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: "/login" })
  app.register(usersRoutes, { prefix: "/users" })
  app.register(forgotRoutes, { prefix: "/esqueceu-senha" })
  app.register(resetRoutes, { prefix: "/resetar-senha" })
  app.register(scheduleRoutes, { prefix: "/agendamentos" })

  app.register(vehiclesRoutes, { prefix: "/vehicles" })
  app.register(profilesRoutes, { prefix: "/profile" })
  app.register(maintenanceRoutes, { prefix: "/maintenance" })
}
