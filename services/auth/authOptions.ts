import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prisma from "@/lib/prisma";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 24h
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        // VALIDATION
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        // FIND USER
        const foundUser = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!foundUser) return null;

        // COMPARE PASSWORDS
        const passwordCorrect = await compare(
          credentials.password || "",
          foundUser.password
        );

        if (passwordCorrect) {
          const user = {
            id: foundUser.id,
            email: foundUser.email,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            role: foundUser.role,
          };
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // console.log("JWT CALLBACK", { token, user, trigger, session });

      if (trigger === "update" && session) {
        return {
          ...token,
          email: session.email,
          firstName: session.firstName,
          lastName: session.lastName,
        };
      }

      if (user) {
        return {
          ...token,
          id: typeof user.id === "string" ? parseInt(user.id) : user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      // console.log("SESSION CALLBACK", { session, token, user });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          firstName: token.firstName,
          lastName: token.lastName,
          role: token.role,
        },
      };
    },
  },
} satisfies NextAuthOptions;
