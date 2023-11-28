import Skeleton from "react-loading-skeleton";
import ErrorPage from "../../../components/errorpage/ErrorPage";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosNormal from "../../../hooks/useAxiosNormal";
import toast from "react-hot-toast";
import { useState } from "react";
import { Helmet } from "react-helmet-async";


const Feedback = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const axiosNormal=useAxiosNormal()
    const [selectedCampName, setSelectedCampName] = useState('');
    const registerInfoFn = async () => {
        const res = await axiosSecure.get(`/paidRegister?email=${user?.email}`)
        return res.data
    }
    const  closeModal = () => {
        document.getElementById('my_modal_3').close();
      };

    const { data: registersInfo, isLoading, isError, isPending } = useQuery({
        queryKey: ['paidAndRegister', user?.email],
        queryFn: registerInfoFn
    })

    if (isError) {
        return <ErrorPage></ErrorPage>
    }
    if (isLoading || isPending) {
        return <Skeleton count={10} />
    }

    const handleReview = async(e) => {
        e.preventDefault()
        const form = e.target
        const rating = form.rating.value
        const campName = selectedCampName
        const comment = form.comment.value 
        if(rating>5){
            return toast.error("The value of rating will be 5 or less than 5")
        }
        const reviewInfo = {
            rating, campName, comment,
            userName: user?.displayName,
            pic: user?.photoURL
        } 
          const res= await axiosNormal.post('/review',reviewInfo)
          if(res.data.insertedId){
             form.reset()
             toast.success('Successfully Add your Review')
             closeModal()
          }  
    }

    return (
        <div>
           <Helmet><title>MCH | Review </title></Helmet>
            <div className="mx-auto text-center md:w-4/12 my-8 md:mt-10">
                <h3 className="uppercase text-4xl border-y-4 py-4"> Review Our <span className="text-[#B354A6]">Camps</span> </h3>
            </div>

            <div className="p-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Camp Name</th>
                            <th>location</th>
                            <th>scheduled</th>
                            <th>fees</th>
                            <th>Payment Status</th>
                            <th>Review Camp</th>
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
                                <th >{item?.paymentStatus}</th>
                                <th >
                                  <div>
                                  <button className="btn text-white btn-sm bg-[#B354A6] " onClick={() => {  setSelectedCampName(item.CampName); document.getElementById('my_modal_3').showModal()}}> Review </button>
                                    <dialog id="my_modal_3" className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <h1 className="mb-5 text-xl">Camp Name: {selectedCampName}</h1>
                                            <form onSubmit={handleReview}>
                                                <div className="  gap-3 ">
                                                    <div className="w-1/4 mb-5">
                                                        <p>Rating*</p>
                                                        <input  placeholder="out of 5" className="border-2 w-full" type="text" name="rating" required />
                                                    </div>
                                                    <div className=" w-1/2">
                                                        <p>Comment Your Review Here*</p>
                                                        <textarea className="border-2 " name="comment" id="" cols="50" rows="4"></textarea>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center mt-4 ">
                                                    <input className="bg-[#B354A6] cursor-pointer text-white px-2 rounded-md" type="submit" value="Submit" />
                                                </div>

                                            </form> 

                                        </div>
                                    </dialog>
                                  </div>

                                </th>


                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Feedback;