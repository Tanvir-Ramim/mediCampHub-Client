import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosNormal from "../../../../hooks/useAxiosNormal";


const ManageCamCare = () => {
      const{user}=useAuth()
      const axisNormal=useAxiosNormal()
      const campsFn=async()=>{
         const res= await axisNormal.get(`/careWant?email=${user?.email}`)
         return res.data
      }
       const{data:camps}=useQuery({
         queryKey: ['campsCare',user?.email],
         queryFn: campsFn
       })
         console.log(camps)
    return (
        <div>
            this is manage cam cmaps
        </div>
    );
};

export default ManageCamCare;