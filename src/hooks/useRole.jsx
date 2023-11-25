import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosNormal from "./useAxiosNormal";


const useRole = () => {
     const axiosNormal=useAxiosNormal()
     const {user}=useAuth()
    const roleFn=async()=>{
          const res= await axiosNormal.get(`/userRole/${user.email}`)
          return res
    }
        
       const{data:userRole,isPending}=useQuery({
        queryKey:[user?.email,'userRole'],
        queryFn: roleFn
       })
         if(isPending){
            return
         }
         const role= userRole?.data?.role
        //  console.log(role)
    return role
};

export default useRole;