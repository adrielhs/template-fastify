import cron from "node-cron"
import { prisma } from "@config/prisma"

let isUpdatingSchedules = false
const isStartingMaintenance = false
let isFinishingMaintenance = false

cron.schedule(
  "*/30 * * * *",
  async () => {
    if (isUpdatingSchedules) {
      console.log(
        `[${new Date().toISOString()}] Job de agendamentos ainda está executando, pulando...`,
      )
      return
    }

    isUpdatingSchedules = true
    try {
      console.log(`[${new Date().toISOString()}] Verificando agendamentos...`)
      const result = await prisma.schedules.updateMany({
        where: {
          expected_final_date: { lte: new Date() },
          status: { not: "CONCLUÍDO" },
        },
        data: { status: "CONCLUÍDO" },
      })
      console.log(`Atualizados ${result.count} agendamentos.`)
    } catch (err) {
      console.error("Erro ao atualizar status:", err)
    } finally {
      isUpdatingSchedules = false
    }
  },
  {
    timezone: "America/Sao_Paulo",
  },
)

// Finalizar manutenções a cada 15 minutos
cron.schedule(
  "*/15 * * * *",
  async () => {
    if (isFinishingMaintenance) {
      console.log(
        `[${new Date().toISOString()}] Job de finalizar manutenções ainda está executando, pulando...`,
      )
      return
    }

    isFinishingMaintenance = true
    try {
      console.log(
        `[${new Date().toISOString()}] Verificando manutenções para finalizar...`,
      )

      const now = new Date()

      const result = await prisma.maintenance.updateMany({
        where: {
          expected_return_date: { lte: now },
          maintenance: true,
          maintenance_return_date: null,
        },
        data: {
          maintenance: false,
          maintenance_return_date: now,
        },
      })

      if (result.count > 0) {
        console.log(`${result.count} manutenções finalizadas automaticamente.`)
      } else {
        console.log("Nenhuma manutenção para finalizar.")
      }
    } catch (err) {
      console.error("Erro ao finalizar manutenções:", err)
    } finally {
      isFinishingMaintenance = false
    }
  },
  {
    timezone: "America/Sao_Paulo",
  },
)

console.log("✓ Cron jobs inicializados com sucesso")
