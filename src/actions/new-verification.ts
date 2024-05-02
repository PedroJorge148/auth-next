'use server'

import { db } from "@/lib/prisma"
import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"

export async function newVerification(token: string) {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    return { error: 'Token does not exists!' }
  }

  const tokenHasExpired = new Date(existingToken.expires) < new Date()

  if (tokenHasExpired) {
    return { error: 'Token has expired!' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: 'Email does not exists!' }
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: { 
      emailVerified: new Date(),
      email: existingToken.email,
    }
  })

  await db.verificationToken.delete({
    where: { id: existingToken.id }
  })

  return { success: 'Email verified!' }
}