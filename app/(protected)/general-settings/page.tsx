import { Loader } from '@/components/ui-kit/Loader'
import React, { Suspense } from 'react'
import { PageBase } from './toolkit/page-base'
import { apiServices } from '@/lib/api.services'
import { settings } from '@/lib/api-endpoints'

const GeneralSettings = async () => {
    const response = await apiServices(settings, "get")
  return (
    <Suspense fallback={<Loader />}>
      <PageBase response={response.data}/>
    </Suspense>
  )
}

export default GeneralSettings
