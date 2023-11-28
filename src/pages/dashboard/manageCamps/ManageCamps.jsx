import Skeleton from "react-loading-skeleton";
// import useAllCamps from "../../../hooks/useAllCamps";
import 'react-loading-skeleton/dist/skeleton.css'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "../../../components/errorpage/ErrorPage";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const ManageCamps = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const dataFn = async () => {
        const res = await axiosSecure.get(`/manageCamps?email=${user?.email}`)
        return res.data
    }
    const { data: campsInfo, isLoading, isPending, refetch, isError } = useQuery({
        queryKey: ['amps',user?.email],
        queryFn: dataFn
    })

    if (isError) {
        return <ErrorPage></ErrorPage>
    }
    if (isLoading || isPending) {
        return <Skeleton count={10} />
    }

    const handleDelete=(id)=>{
        Swal.fire({
            title: "Are you sure Delete?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                const res=await axiosSecure.delete(`/camp/${id}`)
                if(res.data.deletedCount>0){
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });

                }
            }
          });

           
    }
     
    

    return (
        <div className="p-5">
            <Helmet><title>MCH | Dashboard | ManageCamps</title></Helmet>
            <div className="mx-auto text-center md:w-4/12 my-8 md:mt-10">
                <h3 className="uppercase text-4xl border-y-4 py-4">Manage Your <span className="text-[#B354A6]">Camps</span> </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>location</th>
                            <th>participant</th>
                            <th>scheduled</th>
                            <th>fees</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            campsInfo.map((item, index) => <tr key={item._id}>
                                <th >{index + 1}</th>
                                <td>{item?.name}</td>
                                <td>{item?.location}</td>
                                <td>{item?.participant}</td>
                                <td>{item?.scheduled}</td>
                                <td>${item?.fees}</td>
                                <td><Link to={`/dashboard/update-camp/${item?._id}`}><button className="bg-[#B354A6] text-white px-1 rounded">Update</button></Link></td>
                                <td><button onClick={()=>handleDelete(item._id)} className="btn btn-sm btn-square btn-outline">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default ManageCamps;