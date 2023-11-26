import { useForm } from "react-hook-form";
import useAxiosNormal from "../../../hooks/useAxiosNormal";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddACamp = () => {
    const axiosNormal = useAxiosNormal()
    const [hp,setHp]=useState([])
    
    useEffect(()=>{
           axiosNormal.get('/hp')
           .then(res=>{
            setHp(res?.data)
           
           })
    },[axiosNormal])
    const { register, handleSubmit, reset  } = useForm()
   
  
    const onSubmit = async (data) => {
        if(data.healthPro==="default")
        {
            toast.error('Please Select a Healthcare Professionals')
            return 
        }
        console.log(data.healthPro)
    
        const imageFile = { image: data.image[0] }
        const res = await axiosNormal.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const campsInfo={
                name:data.name,
                scheduled:data.Scheduled,
                audience:data.audience,
                details: data.details,
                fees: data.fees,
                healthPro:data.healthPro.split(", ")[1],
                healthCareName:data.healthPro.split(", ")[0],
                image: res.data.data.display_url,
                location: data.location,
                services: data.services,
                participant:5
            }

            axiosNormal.post('/camps',campsInfo)
            .then(res=>{
                 if(res.data.insertedId){
                    console.log(res.data)
                    reset()
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Your work has been saved",
                      showConfirmButton: false,
                      timer: 1500
                    });
                 }
            })  
        }

        
    }

    return (
        <div>
            <h1 className="text-center text-[#B354A6] text-5xl mt-5">Add A Camp</h1>
            <div className="flex min-h-[70vh] px-6 items-center justify-center ">
            <div className="w-full">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="md:flex  gap-4 ">
                        <div className="form-control md:w-2/5 my-6">
                            <label className="label">
                                <span className="label-text">Camp Name*</span>

                            </label>
                            <input type="text" placeholder="Camp Name" {...register('name' ,{required:true})} className="input input-bordered w-full " required/>
                        </div>

                        <div className="form-control md:w-2/5 my-6">
                            <label className="label">
                                <span className="label-text">Venue
                                    Location*</span>
                            </label>
                            <input type="text" placeholder="Location" {...register('location',{required:true})} className="input input-bordered w-full " required/>
                        </div>

                        <div>
                            <div className="form-control w-full my-6">
                                <label className="label">
                                    <span className="label-text">Specialized Services</span>
                                </label>
                                <input type="text" placeholder="Services" {...register('services',{required:true})} className="input input-bordered w-full "required />
                            </div>
                         
                        </div>
                    </div>

                    <div className="md:flex gap-4">
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Healthcare Professionals*</span>
                            </label>
                            <select defaultValue='default'  placeholder="Select A Category" required  {...register("healthPro", { required: true })} className="select select-bordered w-full ">
                                <option disabled   value='default'>Select Healthcare Professionals</option>
                    
                                {
                                    hp?.map(person=><option key={person._id}>{person?.name} , {person?.email}</option>)
                                }
                            </select>
                        </div>
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Camp Fees</span>

                            </label>
                            <input type="number" placeholder="Camp Fees" {...register('fees', { required: true })} className="input input-bordered w-full " required/>
                        </div>
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Target Audience</span>
                            </label>
                            <input type="text" placeholder="Target Audience" {...register('audience', { required: true })} className="input input-bordered w-full " required />
                        </div>
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Recipe Details</span>
                        </label>
                        <textarea {...register('details')} className="textarea textarea-bordered h-24" placeholder="Comprehensive Description" required></textarea>
                    </div>

                    <div className="md:flex mt-5">
                        <div className="w-full mb-4 md:mb-0">
                        <label className="label">
                                    <span className="label-text">Select Picture</span>
                                </label>
                            <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" required/>
                        </div>

                        <div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Scheduled Date and Time</span>
                                </label>

                                <input type="datetime-local" placeholder="Recipe Name" {...register('Scheduled', { required: true })} className="input input-bordered w-full " required />
                            </div>
                        </div>
                    </div>

                    <div className="flex mt-5 justify-center ">
                    <button className="btn text-white bg-[#B354A6]">
                        Add Camp 
                    </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default AddACamp;