'use server'

import { generateVerificationToken } from "@/data/tokens";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { db } from "@/lib/prisma";
import { SettingsSchema } from "@/schemas";
import { compare, hash } from "bcryptjs";

export async function settings(values: SettingsSchema) {
  const user = await currentUser()

  if (!user || !user.id) {
    return { error: 'Unauthorized' }
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    return { error: 'Unauthorized' }
  }

  if (user.isOAuth) {
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
    values.isTwoFactorEnabled = undefined
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email)

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email already in use!' }
    }

    const verificationToken = await generateVerificationToken(values.email)

    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return { success: 'Verification email sent!' }
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await compare(values.password, dbUser.password)

    if (!passwordsMatch) {
      return { error: 'Incorrect password!' }
    }

    const hashedPassword = await hash(values.newPassword, 10)
    values.password = hashedPassword
    values.newPassword = undefined
  }

  await db.user.update({
    where: { id: dbUser.id},
    data: {
      ...values,
    }
  })

  return { success: 'Settings updated!' }
}