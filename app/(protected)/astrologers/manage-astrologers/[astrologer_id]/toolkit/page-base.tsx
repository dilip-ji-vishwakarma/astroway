/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

const PageBase = ({response}: any) => {
  return (
    <code>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </code>
  )
}

export default PageBase
