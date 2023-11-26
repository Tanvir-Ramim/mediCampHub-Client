import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosNormal from "./useAxiosNormal";

import 'react-loading-skeleton/dist/skeleton.css'

const useRole = () => {
     const axiosNormal=useAxiosNormal()
     const {user}=useAuth()
    const roleFn=async()=>{
          const res= await axiosNormal.get(`/userRole/${user.email}`)
          return res
    }
        
       const{data:userRole, isLoading }=useQuery({
        queryKey:[user?.email,'userRole'],
        queryFn: roleFn
       })
      
         const role= userRole?.data?.role
    return {role,isLoading}
};

export default useRole;