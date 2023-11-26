import { useQuery } from "@tanstack/react-query";
import useAxiosNormal from "./useAxiosNormal";


const useAllCamps = () => {
     
    const axiosNormal=useAxiosNormal()
     
    const allCamps=async()=>{
        const res=await axiosNormal.get('/camps')
        return res
    }
    const {data ,isLoading,isPending,refetch}=useQuery({
         queryKey:['allCamps'],
         queryFn: allCamps
    })
     const campsInfo=data?.data
    return {campsInfo, isLoading,isPending,refetch}
};

export default useAllCamps;