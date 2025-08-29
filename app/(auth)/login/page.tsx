import React, { Suspense } from 'react'
import { PageBase } from './toolkit/page-base'
import { Loader } from '@/components/ui-kit/Loader'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

const Auth = async () => {
  const session = await getServerSession(authOptions)
  console.log("Server session:", session)

  return (
    <Suspense fallback={<Loader />}>
      <PageBase /> 
    </Suspense>
  )
}

export default Auth
