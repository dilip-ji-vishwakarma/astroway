/* eslint-disable @typescript-eslint/no-explicit-any */
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

type Props = {
  children: React.ReactNode
}

export default async function SubdomainLayout({ children }: Props) {
  const session: any = await getServerSession(authOptions)

  if (!session?.user?.access_token) {
    redirect('/login')
    
  }

  return <>{children}</>
}