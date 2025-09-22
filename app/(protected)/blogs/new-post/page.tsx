import React, { Suspense } from 'react'
import { PageBase } from './toolkit/page-base'
import { Loader } from '@/components/ui-kit/Loader'

const NewPost = () => {
  return (
    <Suspense fallback={<Loader />}>
      <PageBase />
    </Suspense>
  )
}

export default NewPost
