import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ErrorPage from "../../../components/errorpage/ErrorPage";
import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet-async";
import { ImCancelCircle } from "react-icons/im";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const RegisteredCamps = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const registerInfoFn = async () => {
        const res = await axiosSecure.get(`/register?email=${user?.email}`)
        return res.data
    }

    const { data: registersInfo, isLoading, isError, isPending, refetch } = useQuery({
        queryKey: ['registerInfo', user?.email],
        queryFn: registerInfoFn
    })

    if (isError) {
        return <ErrorPage></ErrorPage>
    }
    if (isLoading || isPending) {
        return <Skeleton count={10} />
    }

    const handleCancelRegister = (id, campId) => {

        Swal.fire({
            title: "Are you sure Cancel Register?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosSecure.delete(`/deleteRegister/${id}`)
                if (res.data.deletedCount) {
                    const passInfo = {
                        searchId: campId
                    }
                    const res = await axiosSecure.put('/participateOut', passInfo)
                    if (res.data.modifiedCount) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Delete Successful",
                            icon: "success"
                        });
                        refetch()
                    }
                }

            }
        });
    }


    return (
        <div className="p-5">
            <Helmet><title>MCH | Register Camps </title></Helmet>
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
                                <th >{index + 1}</th>
                                <th >{item?.CampName}</th>
                                <th >{item?.location}</th>
                                <th >{item?.scheduled}</th>
                                <th >{item?.fees}</th>
                                <th >{item?.ConfirmationStatus}</th>
                                <th >{
                                    item?.paymentStatus === "Pay" ? <Link to={`/dashboard/payment?id=${item.campId},${item._id}`} className="bg-red-500  py-1 text-white px-4 rounded-md">Pay</Link> : <button disabled className="bg-[#B354A6]  py-1 text-white px-4 rounded-md">Paid</button>
                                }</th>
                                <th >{
                                    item?.paymentStatus === "Pay" ? <button onClick={() => handleCancelRegister(item._id, item.campId)}><ImCancelCircle className="text-3xl" /></button> : <ImCancelCircle className="text-3xl text-gray-400 " />
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