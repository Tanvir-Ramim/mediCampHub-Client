import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosNormal from "../../hooks/useAxiosNormal";
import Skeleton from "react-loading-skeleton";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ErrorPage from "../../components/errorpage/ErrorPage";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";



const Update = () => {
    const { id } = useParams()
    const axiosNormal = useAxiosNormal()
    const axiosSecure = useAxiosSecure()
    const navigate=useNavigate()
    const [hp,setHp]=useState([])
    useEffect(()=>{
        axiosNormal.get('/hp')
        .then(res=>{
         setHp(res?.data)
        })
 },[axiosNormal])
 const { register, handleSubmit, reset  } = useForm()

 
    const campsDetailsFn = async () => {
        const res = await axiosNormal.get(`/camp/${id}`)
        return res.data
    }

    const { data: campDetails, isLoading, isPending, isError ,refetch} = useQuery({
        queryKey: ['update', id],
        queryFn: campsDetailsFn
    })

    if (isError) {
        return <ErrorPage></ErrorPage>
    }

    if (isLoading || isPending) {
        return <Skeleton count={10} />
    }
    const {_id,  name, services, scheduled, location, fees, audience, healthCareName, details,healthPro } = campDetails || {}


    const onSubmit = async (data) => {
   
        const campsInfo={
            name:data.name,
            scheduled:data.Scheduled,
            audience:data.audience,
            details: data.details,
            fees: data.fees,
            healthPro:data.healthPro.split(", ")[1],
            healthCareName:data.healthPro.split(", ")[0],
            location: data.location,
            services: data.services,
            id:_id
        
        }
             const res= await axiosSecure.put('/updateCamp',campsInfo)
             if(res.data.modifiedCount>0){
                toast.success('Successfully Update') 
                reset()
                refetch()
                navigate(-1)   
             }
}




    return (
        <div>
            <Helmet><title>MCH | CampsUpdate</title></Helmet>
        <h1 className="text-center text-[#B354A6] text-5xl mt-5">Update Camp</h1>
        <div className="flex min-h-[70vh] px-6 items-center justify-center ">
        <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="md:flex  gap-4 ">
                    <div className="form-control md:w-2/5 my-6">
                        <label className="label">
                            <span className="label-text">Camp Name*</span>

                        </label>
                        <input type="text" defaultValue={name} placeholder="Camp Name" {...register('name' ,{required:true})} className="input input-bordered w-full " required/>
                    </div>

                    <div className="form-control md:w-2/5 my-6">
                        <label className="label">
                            <span className="label-text">Venue
                                Location*</span>
                        </label>
                        <input defaultValue={location} type="text" placeholder="Location" {...register('location',{required:true})} className="input input-bordered w-full " required/>
                    </div>

                    <div>
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Specialized Services</span>
                            </label>
                            <input defaultValue={services} type="text" placeholder="Services" {...register('services',{required:true})} className="input input-bordered w-full "required />
                        </div>

                    </div>
                </div>

                <div className="md:flex gap-4">
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Healthcare Professionals*</span>
                        </label>
                        <select   placeholder="Select A Category" required  {...register("healthPro", { required: true })} className="select select-bordered join-item">
                            <option>   {healthCareName} , {healthPro}</option>
                
                            {
                                hp?.map(person=><option key={person._id}>{person?.name} , {person?.email}</option>)
                            }
                        </select>
                    </div>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Camp Fees*</span>

                        </label>
                        <input defaultValue={fees} type="number" placeholder="Camp Fees" {...register('fees', { required: true })} className="input input-bordered w-full " required/>
                    </div>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Target Audience*</span>
                        </label>
                        <input defaultValue={audience} type="text" placeholder="Target Audience" {...register('audience', { required: true })} className="input input-bordered w-full " required />
                    </div>
                </div>

                

                <div className="md:flex mt-5 gap-3">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Recipe Details*</span>
                    </label>
                    <textarea defaultValue={details} {...register('details')} className="textarea textarea-bordered h-24" placeholder="Comprehensive Description" required></textarea>
                </div>

                    <div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Scheduled Date and Time*</span>
                            </label>

                            <input defaultValue={scheduled} type="datetime-local" placeholder="Recipe Name" {...register('Scheduled', { required: true })} className="input input-bordered w-full " required />
                        </div>
                    </div>
                </div>

                <div className="flex mt-8 justify-center ">
                <button className="btn text-white bg-[#B354A6]">
                    Update Camp
                </button>
                </div>
            </form>
        </div>
    </div>
    </div>
    );
};

export default Update;