'use server'
import { AuthError } from "next-auth"

import { signIn } from "@/auth"
import { getUserByEmail } from "@/data/user"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema, loginSchema } from "@/schemas"
import { 
  sendVerificationEmail, 
  sendTwoFactorTokenEmail,
} from "@/lib/mail"
import { 
  generateVerificationToken, 
  generateTwoFactorToken,
} from "@/data/tokens"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token"
import { db } from "@/lib/prisma"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"

export async function login(
  values: LoginSchema,
  callbackUrl?: string | null
) {
  const validatedFields = loginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password, code } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  // Check if email really exists 
  if (!existingUser || !existingUser.email) {
    return { error: 'Email does not exists!' }
  }

  // Check if user verified email
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    )

    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return { success: 'Confimation email sent!'}
  }

  // 2FA check
  if (existingUser.isTwoFactorEnabled) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)
      
      if (!twoFactorToken) {
        return { error: 'Invalid code!' }
      }

      if (twoFactorToken.token !== code) {
        return { error: 'Invalid code!' }
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date()

      debugger

      if (hasExpired) {
        return { error: 'Code expired!' }
      }

      await db.twoFactorToken.delete({
        where: {id: twoFactorToken.id }
      })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      )

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id }
        })
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id
        }
      })
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      await sendTwoFactorTokenEmail(
        twoFactorToken.email,
        twoFactorToken.token,
      )
  
      return { twoFactor: true }
    }
  }

  console.log(callbackUrl)

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) { 
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default:
          return { error: 'Something went wrong.' }
      }
    }
    
    throw error
  }
}