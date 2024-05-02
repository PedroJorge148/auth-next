import { randomUUID } from 'node:crypto'
import { getVerificationTokenByEmail } from "./verification-token"
import { db } from "@/lib/prisma"

export async function generateVerificaitonToken(email: string) {
  const token = randomUUID()
  const expires = new Date(new Date().getTime() + 3600 * 1000) // expires in 1 hour

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      }
    })
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return verificationToken
} 