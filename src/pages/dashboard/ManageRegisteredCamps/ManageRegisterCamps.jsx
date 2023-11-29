import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "../../../components/errorpage/ErrorPage";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";

const ManageRegisterCamps = () => {
    const axiosSecure = useAxiosSecure()
    const allRegisterFn = async () => {
        const res = await axiosSecure.get('/registerAll')
        return res.data
    }

    const { data: allRegister, isError, isLoading, isPending,refetch } = useQuery({
        queryKey: ['allRegister'],
        queryFn: allRegisterFn
    })
    if (isError) {
        return <ErrorPage></ErrorPage>
    }

    if (isLoading || isPending) {
        return <Skeleton count={10} />
    }

      
    const handleConfirm=async(id)=>{
          const changeInfo={
             id,
             status: "Confirm"
          }

          const res=await axiosSecure.put('/changeStatus',changeInfo)
          if(res.data.modifiedCount){
            toast.success('Confirm Successful')
                refetch()
          }
    }


    return (
        <div>
            <Helmet><title>MCH | Dashboard | Register</title></Helmet>
            <div className="mx-auto text-center md:w-4/12 my-8 md:mt-10">
                <h3 className="uppercase text-4xl border-y-4 py-4">Manage <span className="text-[#B354A6]">Register</span> </h3>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Camp Name</th>
                            <th>location</th>
                            <th>User</th>
                            <th>scheduled</th>
                            <th>fees</th>
                            <th>Payment Status</th>
                            <th>Confirmation Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allRegister.map((item, index) => <tr key={item._id}>
                                <th >{index + 1}</th>
                                <th >{item?.CampName}</th>
                                <th >{item?.location}</th>
                                <th >{item?.name}</th>
                                <th >{item?.scheduled}</th>
                                <th >{item?.fees}</th>
                                <th >{
                                    item?.paymentStatus === "Paid" ? "Paid" : "none"
                                }</th>
                                <th >{item?.ConfirmationStatus==="pending" ?  <button onClick={()=>handleConfirm(item._id)} className="bg-[#B354A6] text-white p-1 rounded-md">Make Confirm</button> :  <h1 className="text-lg">Confirm</h1>
                                }</th>


                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageRegisterCamps;