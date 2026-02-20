import { parse, isValid } from "date-fns"
import { ptBR } from "date-fns/locale"
import { AppError } from "@shared/error/AppError"

const FORMATS = [
  "dd/MM/yyyy HH:mm",
  "dd/MM/yyyy",
  "yyyy-MM-dd'T'HH:mm:ss.SSSXXX",
  "yyyy-MM-dd'T'HH:mm:ssXXX",
  "yyyy-MM-dd'T'HH:mm",
]

export function parseStringToDate(
  dateInput: string | Date | null | undefined,
): Date {
  if (dateInput instanceof Date) return dateInput
  if (!dateInput) throw new AppError("Formato de data inválido")

  // Limpar possíveis duplicações de data (workaround temporário)
  let cleanedInput = dateInput
  if (typeof dateInput === "string") {
    // Remove padrões duplicados como "31/01/2026/02/2026"
    const match = dateInput.match(/(\d{2}\/\d{2}\/\d{4})/)
    if (match) {
      // Pega apenas a primeira ocorrência da data + a parte do horário
      const timePart = dateInput.split(" ").pop() // Pega "18:00"
      cleanedInput = `${match[1]} ${timePart}`
      console.log("⚠️ Data corrigida de:", dateInput, "para:", cleanedInput)
    }
  }

  for (const formatStr of FORMATS) {
    const parsed = parse(cleanedInput, formatStr, new Date(), { locale: ptBR })
    if (isValid(parsed)) {
      console.log("✅ Parseado com formato:", formatStr)
      return parsed
    }
  }

  const iso = new Date(cleanedInput)
  if (isValid(iso)) return iso

  throw new AppError("Formato de data inválido")
}

export function isValidDateString(
  dateInput: string | Date | null | undefined,
): boolean {
  try {
    parseStringToDate(dateInput)
    return true
  } catch {
    return false
  }
}
