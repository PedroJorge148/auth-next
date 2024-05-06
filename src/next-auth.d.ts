import { type DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      role: 'ADMIN' | 'USER'
      isTwoFactorEnabled: boolean
      isOAuth: boolean
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: 'ADMIN' | 'USER'
    isTwoFactorEnabled: boolean
    isOAuth: boolean
  }
}