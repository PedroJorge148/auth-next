import { db } from "@/lib/prisma";

export async function getPasswordResetTokenByToken(token: string) {
 try {
  const passwordToken = await db.passwordResetToken.findUnique({
    where: { token }
  })

  return passwordToken
 } catch {
  return null
 }
}

export async function getPasswordResetTokenByEmail(email: string) {
  try {
   const passwordToken = await db.passwordResetToken.findFirst({
     where: { email }
   })
 
   return passwordToken
  } catch {
   return null
  }
 }