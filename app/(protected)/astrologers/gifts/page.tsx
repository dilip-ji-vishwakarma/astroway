import { Loader } from '@/components/ui-kit/Loader';
import { gifts } from '@/lib/api-endpoints';
import { apiServices } from '@/lib/api.services';
import { Metadata } from 'next'
import React, { Suspense } from 'react'
import { PageBase } from './toolkit/page-base';
import { BaseHeader } from './toolkit/base-header';

export const metadata: Metadata = {
  title: 'Gifts',
}

const Gifts = async () => {
    const response = await apiServices(gifts, "get");
  return (
    <Suspense fallback={<Loader />}>
        <BaseHeader />
      <PageBase initialData={response.data} initialPagination={response.pagination} />
    </Suspense>
  )
}

export default Gifts
