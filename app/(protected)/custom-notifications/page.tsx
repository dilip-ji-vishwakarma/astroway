import { Loader } from '@/components/ui-kit/Loader'
import React, { Suspense } from 'react'
import { PageBase } from './toolkit/page-base'

const CustomNotifications = () => {
  return (
    <Suspense fallback={<Loader />}>
      <PageBase />
    </Suspense>
  )
}

export default CustomNotifications
