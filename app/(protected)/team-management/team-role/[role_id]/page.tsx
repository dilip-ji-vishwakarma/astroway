/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { PageBase } from './toolkit/page-base';
import { apiServices } from '@/lib/api.services';
import { role } from '@/lib/api-endpoints';

const page = async ({params} : any) => {
   const { role_id } = await params;
    const response = await apiServices(`${role}s/${role_id}`, "get");
  return (
    <div>
      <PageBase response={response.data}/>
    </div>
  )
}

export default page
