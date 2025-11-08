import { Loader } from '@/components/ui-kit/Loader'
import React, { Suspense } from 'react'
import { PageBase } from './toolkit/page-base'
import { TextH1 } from '@/components/ui-kit/TextH1'

const Page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <TextH1>Withdrawal Requests</TextH1>
      <PageBase />
    </Suspense>
  )
}

export default Page
