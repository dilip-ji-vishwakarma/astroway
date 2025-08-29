/* eslint-disable @typescript-eslint/no-explicit-any */
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

type Props = {
  children: React.ReactNode
}

export default async function SubdomainLayout({ children }: Props) {
  // Get the session from next-auth
  const session = await getServerSession(authOptions)

  // Debug log (server side)
  console.log("Session in layout:", session)

  // If no session or no token, redirect to login
  if (!session || !session.user?.token) {
    redirect('/login')
  }

  return <>{children}</>
}
