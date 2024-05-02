import NextAuth, { type DefaultSession } from "next-auth"
import { PrismaAdapter } from '@auth/prisma-adapter'

import { db } from "./lib/prisma"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification, can be account?.type too
      if (account?.provider !== 'credentials') return true

      if (!user.id) {
        return false
      }
      
      const existingUser = await getUserById(user.id)

      // Prevent sign in without email verification
      if (!existingUser || !existingUser.emailVerified) {
        return false
      }

      // TODO: Add 2FA check

      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token
      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      token.role = existingUser.role

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})