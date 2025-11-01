import React, { Suspense } from 'react'
import { PageBase } from './toolkit/page-base'
import { Loader } from '@/components/ui-kit/Loader'
import { BaseHeader } from './toolkit/base_header'
import { apiServices } from '@/lib/api.services'
import { role, user_list } from '@/lib/api-endpoints'

const TeamList = async () => {
  const response = await apiServices(user_list, "get");
  const roles = await apiServices(role, "get");
  return (
    <Suspense fallback={<Loader />}>
      <BaseHeader response={response.data} />
      <PageBase roles={roles.data}/>
    </Suspense>
  )
}

export default TeamList
