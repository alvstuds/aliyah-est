import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compare } from 'bcrypt'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db } from './db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        })

        const isUser = await compare(credentials?.password!, user?.password!)

        if (isUser) {
          return user
        }

        throw new Error('wrong credentials')
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.role = token.role
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        token.id = user!.id
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        role: dbUser.role,
      }
    },
  },
}
