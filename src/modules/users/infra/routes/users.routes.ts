import { FastifyInstance } from "fastify"
import {
  createUser,
  getAllUsers,
  softDeleteUser,
  updateUsers,
  exportUserXlsx,
  updateUsersForAdmin,
  deleteUser,
} from "../controllers/users.controller"

import { ensureAuthentication } from "@shared/middlewares/ensure-authentication"
import { makeCheckIsAdminUseCase } from "@shared/utils/factories/make-checkIsAdmin"
const { preHandlerFunction: checkIfAdminPreHandler } = makeCheckIsAdminUseCase()

export async function usersRoutes(app: FastifyInstance) {
  app.post("/", createUser)
  app.get("/", getAllUsers)
  app.put("/:id", { onRequest: ensureAuthentication }, updateUsers)
  app.delete("/:id", { onRequest: ensureAuthentication }, deleteUser)
  app.patch("/:id", { onRequest: ensureAuthentication }, softDeleteUser)
  app.get(
    "/export-users/:user_id",
    {
      onRequest: [ensureAuthentication],
      preHandler: [checkIfAdminPreHandler],
    },
    exportUserXlsx,
  )
  app.put(
    "/:id/admin",
    {
      onRequest: [ensureAuthentication],
      preHandler: [checkIfAdminPreHandler],
    },
    updateUsersForAdmin,
  )
}
