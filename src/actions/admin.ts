'use server'

import { currentRole } from "@/lib/auth"

export async function admin() {
  const role = await currentRole()

  if (role === 'ADMIN') {
    return { success: 'Allowed Server Action!' }
  }

  return { error: 'Forbidden Server Action!' }
}