import cover from '../../../assets/logo/coverPic.jpg'
import useAuth from '../../../hooks/useAuth';
import pp from '../../../assets/logo/no-profile-picture-icon.jpg'
import useRole from '../../../hooks/useRole';
import { useForm } from "react-hook-form";
import useAxiosNormal from '../../../hooks/useAxiosNormal';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const OrganizerProfile = () => {
    const { register, handleSubmit } = useForm();
    const { user,setUser } = useAuth()
    const axiosNormal=useAxiosNormal()
    const {role,isLoading} = useRole()
    if(isLoading)
    {
        return <span className="loading loading-dots loading-lg"></span>
    }
    const onSubmit = async (data) => {
            const imageFile={image: data.image[0]}
            const res= await axiosNormal.post(image_hosting_api,imageFile,{
                headers:{
                     'Content-type': 'multipart/form-data'
                }
            })
           if(res.data.success){
                updateProfile(user,{
                    photoURL: res.data.data.display_url
                })
                .then(()=>{
                    setUser({...user,displayName:name})
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'User created successfully.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
           }
    }
    return (
        <div className=' h-full mt-6  md:flex p-1 md:p-8 items-center justify-center'>
            <Helmet><title>MCH | Dashboard | Profile</title></Helmet>
            
            <div className="mx-auto order-1  text-center md:w-4/12  my-8 md:mt-10">
                <h3 className="uppercase text-4xl border-y-4 py-4"> {role} <span className="text-[#B354A6]">Profile</span> </h3>
            </div>

            <div className='bg-[#F9F1EE] md:w-[600px] shadow-lg order-2 '>
                <img className='h-36  overflow-hidden w-[600px] ' src={cover} alt="" />
                <div className='flex  justify-center -mt-6'>
                    <div className="avatar">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            {
                                user?.photoURL ?  <img src={user.photoURL} /> : <img src={pp} />
                            }

                        </div>
                    </div>
                </div>
                <h1 className='text-center mt-5 bg-gray-400 text-lg font-semibold '>{role}</h1>
                <div className='flex mt-5 justify-between p-2'>
                    <div>
                        <h1 className='text-lg font-semibold'>User Name:</h1>
                        <h1 className='text-lg font-bold'> {user?.displayName}</h1>
                    </div>
                    <div>
                        <h1 className='text-lg font-semibold'>User Email:</h1>
                        <h1 className='text-lg font-bold'> {user?.email}</h1>
                    </div>
                </div>

                {
                   user?.photoURL ? "" : <div className='p-2 flex justify-center'>
                    <button className='bg-red-500 text-white p-1 text-xs rounded-md' onClick={() => document.getElementById('my_modal_3').showModal()}>Update Picture</button>
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-lg">Select Your Picture</h3>


                          <form onSubmit={handleSubmit(onSubmit)} >
                          <div className="form-control w-full my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>
                             <div className='flex justify-center'>
                                <input className='bg-gray-500 text-white px-6 py-1 cursor-pointer rounded-md' type="submit" value="Submit" />
                             </div>
                          </form>
                        </div>
                    </dialog>
                </div>
                }
               
            </div>

            

        </div>
    );
};

export default OrganizerProfile;