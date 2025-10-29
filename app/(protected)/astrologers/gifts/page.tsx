import { Loader } from '@/components/ui-kit/Loader';
import { Metadata } from 'next'
import React, { Suspense } from 'react'
import { PageBase } from './toolkit/page-base';
import { BaseHeader } from './toolkit/base-header';

export const metadata: Metadata = {
  title: 'Gifts',
}

const Gifts = async () => {
  return (
    <Suspense fallback={<Loader />}>
        <BaseHeader />
      <PageBase />
    </Suspense>
  )
}

export default Gifts
