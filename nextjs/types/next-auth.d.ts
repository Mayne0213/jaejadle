// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userId: string;
      name: string;
      email?: string | null;
      emailVerified?: Date | null;
    };
  }

  interface User {
    id: string;
    userId: string;
    name: string;
    email?: string | null;
    emailVerified?: Date | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userId: string;
    name: string;
  }
}

