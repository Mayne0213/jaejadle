import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.JAEJADLE_JWT_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        userId: { label: "아이디", type: "text" },
        userPassword: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.userId || !credentials?.userPassword) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { userId: credentials.userId as string },
        });

        if (!user) {
          return null;
        }

        const isPasswordCorrect = await compare(
          credentials.userPassword as string,
          user.userPassword
        );

        if (!isPasswordCorrect) {
          return null;
        }

        return {
          id: user.id.toString(),
          userId: user.userId,
          name: user.userName,
          email: user.userPhone,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60, // 3일
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userId = user.userId;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.userId = token.userId as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

