/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: number | null
      name?: string | null
      email?: string | null
      role?: string | null
      token?: string | null
    }
  }

  interface User {
    id?: number | null
    name?: string | null
    email?: string | null
    role?: string | null
    token?: string | null
  }

  interface JWT {
    id?: number | null
    name?: string | null
    email?: string | null
    role?: string | null
    token?: string | null
  }
}

