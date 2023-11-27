import { useQuery } from "@tanstack/react-query";
import useAxiosNormal from "./useAxiosNormal";
import ErrorPage from "../components/errorpage/ErrorPage";


const useAllCamps = () => {
     
    const axiosNormal=useAxiosNormal()
     
    const allCamps=async()=>{
        const res=await axiosNormal.get('/camps')
        return res
    }
    const {data ,isLoading,isPending,refetch,isError}=useQuery({
         queryKey:['allCamps'],
         queryFn: allCamps
    })
      if(isError){
        return <ErrorPage></ErrorPage>
      }
     const campsInfo=data?.data
    return {campsInfo, isLoading,isPending,refetch}
};

export default useAllCamps;