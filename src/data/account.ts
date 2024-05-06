import { db } from "@/lib/prisma"

export async function getAccountByUserId(userId: string) {
  try {
    const account = await db.account.findFirst({
      where: { userId }
    })

    return account
  } catch {
    return null
  }
}