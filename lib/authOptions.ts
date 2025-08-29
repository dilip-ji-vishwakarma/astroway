/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { refresh_token_endpoint } from "./api-endpoints";
import { AuthOptions, CredentialsProvider } from "@/src/wrapper/next-auth-wrapper";
import { JWT } from "next-auth/jwt";

async function refreshAccessToken(token: string) {
  const LIVE_NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
  const apiResponse = await fetch(
    `${LIVE_NEXT_PUBLIC_API_URL}${refresh_token_endpoint}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!apiResponse.ok) return null;

  const jsonData = await apiResponse.json();
  return {
    refreshToken: jsonData.refresh_token,
    accessToken: jsonData.token,
  };
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        user: { type: "json" },
      },
      async authorize(credentials: any) {
        if (!credentials?.user) return null;
        try {
          const user = JSON.parse(credentials.user);
          return user;
        } catch {
          return null;
        }
      },
    }),
  ],

  secret: process.env.AUTH_SECRET,

  callbacks: {
    async jwt({ token, user, trigger }): Promise<JWT> {
      // Update token on session update
      if (trigger === "update" && user) {
        return { ...token, ...user };
      }

      // Add user info on first login
      if (user) {
        return { ...token, ...user };
      }

      // Handle refresh token logic
      if (token.accessToken && token.refreshToken) {
        const accessTokenDecode: any = jwtDecode(token.accessToken as string);
        const refreshTokenDecode: any = jwtDecode(token.refreshToken as string);

        const accessTokenTime = new Date(accessTokenDecode.expire_by).getTime();
        const refreshTokenTime = new Date(refreshTokenDecode.expire_by).getTime();
        const currentTime = new Date().getTime();

        if (accessTokenTime > currentTime) {
          return token;
        } else if (refreshTokenTime > currentTime) {
          const response = await refreshAccessToken(token.refreshToken as string);
          if (response) {
            return { ...token, ...response };
          }
        }
      }

      // Always return token
      return token;
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};
