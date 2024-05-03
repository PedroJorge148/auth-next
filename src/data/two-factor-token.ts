import { db } from "@/lib/prisma"

export async function getTwoFactorTokenByToken(token: string) {
  try {
    const twofactorToken = await db.twoFactorToken.findUnique({
      where: { token }
    })

    return twofactorToken
  } catch {
    return null
  }
}

export async function getTwoFactorTokenByEmail(email: string) {
  try {
    const twofactorToken = await db.twoFactorToken.findFirst({
      where: { email }
    })

    return twofactorToken
  } catch {
    return null
  }
}