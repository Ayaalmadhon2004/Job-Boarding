import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextAuthOptions, Session } from "next-auth";

type AuthUser = {
  id: string;
  role: string;
  [key: string]: unknown; // خصائص إضافية
};

type Token = {
  id?: string;
  role?: string;
  [key: string]: unknown; // خصائص إضافية
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) return null;

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword as AuthUser;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: Token; user?: AuthUser }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: Token }) {
      if (token && session.user) {
        (session.user as AuthUser).id = token.id ?? "";
        (session.user as AuthUser).role = token.role ?? "";
      }
      return session;
    },
  },
  pages: {
    signIn: "/signIn",
  },
};
