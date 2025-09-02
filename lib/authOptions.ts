/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AuthOptions,
  CredentialsProvider,
} from "@/src/wrapper/next-auth-wrapper";
import { apiServices } from "./api.services";
import { sign_in_endpoint } from "./api-endpoints";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        user: { type: "json" },
      },
      async authorize(credentials: any) {
        const formData = JSON.parse(credentials.user);

        const { data, error } = await apiServices(
          sign_in_endpoint,
          "post",
          formData
        );

        if (error || !data) return null;

        console.log("Authorize API response:", data);

        return {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          token: data.token,
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: process.env.NEXT_PUBLIC_LOGIN_URL,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: (user as any).id,
          name: (user as any).name,
          email: (user as any).email,
          role: (user as any).role,
          token: (user as any).token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as number,
        name: token.name as string,
        email: token.email as string,
        role: token.role as string,
        token: token.token as string,
      };
      return session;
    },
  },
};

