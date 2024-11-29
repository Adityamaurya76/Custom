import React from 'react'
import { useRouteError } from 'react-router-dom'

function ErrorPage() {
    const error= useRouteError();
    console.log(error);

  return (
   <>
    <h1>Error Page</h1>
   </>
  )
}

export default ErrorPage