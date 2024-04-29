'use server'

import { LoginSchema, loginSchema } from "@/schemas"

export async function login(values: LoginSchema) {
  const validatedFields = loginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  return { success: 'Email sent!' }
}