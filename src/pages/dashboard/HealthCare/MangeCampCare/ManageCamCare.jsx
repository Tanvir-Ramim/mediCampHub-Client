import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosNormal from "../../../../hooks/useAxiosNormal";
import Skeleton from "react-loading-skeleton";
import ErrorPage from "../../../../components/errorpage/ErrorPage";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";


const ManageCamCare = () => {
      const{user}=useAuth()
      const axisNormal=useAxiosNormal()
      const campsFn=async()=>{
         const res= await axisNormal.get(`/careWant?email=${user?.email}`)
         return res.data
      }
       const{data:camps,isError,isLoading,isPending,refetch}=useQuery({
         queryKey: ['campsCare',user?.email],
         queryFn: campsFn
       })
       if (isError) {
        return <ErrorPage></ErrorPage>
    }

    if (isLoading || isPending) {
        return <Skeleton count={10} />
    }
         console.log(camps)
       
         const handleCamp=async(id)=>{
            const change={changeDecision:"true",
             id: id
          }
             const res=await axisNormal.put('/changeDecision',change)
             console.log(res.data.modifiedCount)
             if(res.data.modifiedCount){
              toast.success('Successfully Accepted')
              refetch()
             }
         }


     
    return (
        <div>
            <Helmet><title>MCH | Dashboard | ManageCamps</title></Helmet>
            <div className="mx-auto text-center md:w-4/12 my-8 md:mt-10">
                <h3 className="uppercase text-4xl border-y-4 py-4">Manage <span className="text-[#B354A6]">Camps</span> </h3>
            </div>
           <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>location</th>
                            <th>scheduled</th>
                            <th>services</th>
                            <th>fees</th>
                            <th>Request For Join</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        {
                            camps.map((item, index) => <tr key={item._id}>
                                <th >{index + 1}</th>
                                <td>{item?.name}</td>
                                <td>{item?.location}</td>
                    
                                <td>{item?.scheduled}</td>
                                <td>{item?.services}</td>
                                <td>${item?.fees}</td>
                                 
                                 <td>
                                  {
                                     item?.healthcareDicison==="false"? <button onClick={()=>handleCamp(item._id)} className="bg-[#B354A6] p-1 text-white  text-sm rounded-md">Accept Camp</button> :<button disabled className="bg-[#8b5b85] text-sm  text-white rounded-md p-1">Accepted</button>
                                  }
                                 </td>
                               
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
           
        </div>
    );
};

export default ManageCamCare;