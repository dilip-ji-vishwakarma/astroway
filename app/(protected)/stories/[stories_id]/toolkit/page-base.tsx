/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

export const PageBase = (data: any) => {
  return (
    <code>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </code>
  )
}