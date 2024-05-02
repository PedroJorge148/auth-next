import { db } from "@/lib/prisma";

export async function getVerificationTokenByEmail(email: string) {
    try {
      const verificationToken = await db.verificationToken.findFirst({
        where: {
          email,
        }
      })

      return verificationToken
    } catch (error) {
      return null
    }
}

export async function getVerificationTokenByToken(token: string) {
    try {
      const verificationToken = await db.verificationToken.findUnique({
        where: {
          token,
        }
      })

      return verificationToken
    } catch (error) {
      return null
    }
}