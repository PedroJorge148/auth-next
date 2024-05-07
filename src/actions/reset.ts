'use server'

import { resetSchema, ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { generatePasswordResetToken } from "@/data/tokens"
import { sendPasswordResetEmail } from "@/lib/mail"
import { getAccountByUserId } from "@/data/account"

export async function reset(values: ResetSchema) {
  const validatedFields = resetSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid email!' }
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: 'Email not found!' }
  }

  const existingAccount = await getAccountByUserId(existingUser.id)

  if (existingAccount) {
    return { error: 'You are registered with a provider!' }
  }


  const passwordResetToken = await generatePasswordResetToken(email)
  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)
  
  return { success: 'Reset email sent!' }
}