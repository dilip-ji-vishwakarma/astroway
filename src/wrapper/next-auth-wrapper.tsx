import NextAuth from 'next-auth'
import getServerSession, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { SessionProvider, signIn, signOut } from 'next-auth/react'

export type { AuthOptions }
export {
  NextAuth,
  getServerSession,
  CredentialsProvider,
  GitHubProvider,
  GoogleProvider,
  signIn,
  signOut
}

export const NextAuthWrapper = SessionProvider