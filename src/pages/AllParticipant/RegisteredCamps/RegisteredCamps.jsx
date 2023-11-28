import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ErrorPage from "../../../components/errorpage/ErrorPage";
import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet-async";
import { ImCancelCircle } from "react-icons/im";
import PaymentModal from "./PaymentModal";

const RegisteredCamps = () => {
       const {user}=useAuth()
      const axiosSecure=useAxiosSecure()
      const registerInfoFn=async()=>{
            const res=await axiosSecure.get(`/register?email=${user?.email}`)
            return res.data
      }
      
      const {data:registersInfo,isLoading,isError,isPending}=useQuery({
         queryKey:['registerInfo',user?.email],
         queryFn: registerInfoFn
      })

      if (isError) {
        return <ErrorPage></ErrorPage>
    }
    if (isLoading || isPending) {
        return <Skeleton count={10} />
    }

    const handleCancelRegister=(id)=>{
            console.log(id)
    }

    
      

    return (
        <div className="p-5">
        <Helmet><title>MCH | </title></Helmet>
        <div className="mx-auto text-center md:w-4/12 my-8 md:mt-10">
            <h3 className="uppercase text-4xl border-y-4 py-4"> Your Register <span className="text-[#B354A6]">Camps</span> </h3>
        </div>
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Camp Name</th>
                        <th>location</th>
                        <th>scheduled</th>
                        <th>fees</th>
                        <th>Confirmation Status</th>
                        <th>Payment Status</th>
                        <th>Cancel Registration</th>
                        
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        registersInfo.map((item, index) => <tr key={item._id}>
                            <th >{index+1}</th>
                            <th >{item?.CampName}</th>
                            <th >{item?.location}</th>
                            <th >{item?.scheduled}</th>
                            <th >{item?.fees}</th>
                            <th >{item?.ConfirmationStatus}</th>
                            <th >{
                            item?.paymentStatus==="Pay" ?<PaymentModal payAmount={item.fess}></PaymentModal>  :  <button disabled className="bg-[#B354A6]  py-1 text-white px-4 rounded-md">Paid</button>
                            }</th>
                            
                            <th >{
                                    item?.paymentStatus==="Pay" ? <button onClick={()=>handleCancelRegister(item._id)}><ImCancelCircle  className="text-3xl"/></button> : <ImCancelCircle  className="text-3xl "/>
                                }</th>

                           
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    </div>
    );
};



export default RegisteredCamps;