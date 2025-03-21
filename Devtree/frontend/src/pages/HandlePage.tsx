import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Navigate, useParams } from 'react-router'
import { getUserByHandle } from '../api/DevTreeAPI'

const HandlePage = () => {
   const params = useParams()
   const handle = params.handle!

   const { data, isLoading, error } = useQuery({
        queryFn: () => getUserByHandle(handle),
        queryKey: ['handle', handle],
        retry: 2
   })

   if(isLoading) return 'Cargando...'
   if(error) return <Navigate to={"/404"}/>

  return (
    <div>HandlePage</div>
  )
}

export default HandlePage