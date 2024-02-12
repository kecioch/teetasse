import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      role: Role;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
  }
}
