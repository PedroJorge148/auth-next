import { randomInt, randomUUID } from 'node:crypto'
import { getVerificationTokenByEmail } from "./verification-token"
import { db } from "@/lib/prisma"
import { getPasswordResetTokenByEmail } from "./password-reset-token"
import { getTwoFactorTokenByEmail } from "./two-factor-token"

export async function generateVerificationToken(email: string) {
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

export async function generatePasswordResetToken(email: string) {
  const token = randomUUID()
  const expires = new Date(new Date().getTime() + 3600 * 1000) // 1 hour

  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id }
    })
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return passwordResetToken
}

export async function generateTwoFactorToken(email: string) {
  const token = randomInt(100_000, 1_000_000).toString()
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000) // 5min

  const existingToken = await getTwoFactorTokenByEmail(email)

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: { id: existingToken.id }
    })
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    }
  })

  return twoFactorToken
}