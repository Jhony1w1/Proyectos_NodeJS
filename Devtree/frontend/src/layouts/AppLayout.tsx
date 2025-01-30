import { Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevTreeAPI";
import DevTree from "../components/DevTree";

export default function AppLayout() {

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    refetchOnWindowFocus: false,
    retry: 1
  })

  if (isLoading) return 'Cargando...'
  if (isError) return <Navigate to={"/auth/login"} />
  if(data) return <DevTree data={data}/>
}
