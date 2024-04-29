'use server'

import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/prisma"
import { registerSchema, RegisterSchema } from "@/schemas"
import { hash } from 'bcryptjs'

export async function register(values: RegisterSchema) {
  const validatedFields = registerSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { name, email, password } = validatedFields.data
  const hashedPassword = await hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Email already in use!' }
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    }
  })

  // TODO: Send verification token email

  return { success: 'User created!' }
}