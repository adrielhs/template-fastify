import { env } from "../../../shared/env"
import bcrypt from "bcrypt"
import crypto from "crypto"

export async function generateHashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, env.SALT_RESULT)
}

export async function compareHashPasswords(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function generateToken() {
  return parseInt(crypto.randomBytes(3).toString("hex"), 16)
    .toString()
    .substring(0, 6)
}
