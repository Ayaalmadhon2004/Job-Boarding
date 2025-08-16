import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// نوسّع نوع الـ User
declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role: string;
  }

  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

// نوسّع نوع الـ JWT
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
