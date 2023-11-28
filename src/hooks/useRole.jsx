import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import 'react-loading-skeleton/dist/skeleton.css'
import useAxiosSecure from "./useAxiosSecure";


const useRole = () => {
      const axiosSecure=useAxiosSecure()

     const {user}=useAuth()
    const roleFn=async()=>{
          const res= await axiosSecure.get(`/userRole/${user.email}`)
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