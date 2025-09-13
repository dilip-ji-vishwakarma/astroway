/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

export const PageBase = ({ response, id }: any) => {
  return (
    <>
    <span>{id}</span>
    <code>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </code>
    </>
  )
}
