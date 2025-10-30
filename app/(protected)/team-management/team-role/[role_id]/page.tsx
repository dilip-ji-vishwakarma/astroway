/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

const page = async ({params} : any) => {
   const { role_id } = await params;
  return (
    <div>
      {role_id}
    </div>
  )
}

export default page
