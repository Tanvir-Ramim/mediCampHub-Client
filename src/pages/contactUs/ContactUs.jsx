

import { FaHome, FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import Swal from "sweetalert2";
import Map from '../../components/map/Map';


const ContactUs = () => {
    const handleSubmit=(e)=>{
          e.preventDefault()
          Swal.fire('Successfully Sent')
          e.target.reset()
    }
    return (
        <div>
            <div className="bg-[#B354A6] flex items-center justify-evenly ">
                <h1 className="md:text-4xl text-3 p-5 font-semibold text-white ">Contact Us</h1>
                <p><span className="text-white">Medi Camps Hub</span> {'>'} Contact Us</p>
            </div>
            <div className="max-w-[1500px] m-auto">
                <div>

                </div>
                <div className='lg:flex  gap-8  mt-7' >
                    <div className='text-lg lg: grow space-y-2 p-5 md:space-y-5'>
                        <h1 className='text-2xl font-semibold mb-4 lg:4'>Office Address</h1>
                        <h3 className='flex lg:items-center gap-2'><FaHome></FaHome> <span className='font-bold'>Dhaka Office</span>: Suite -2, A K Complex, 19 Green Road,Dhanmondi, Dhaka – 1205, Bangladesh</h3>

                        <h3 className='flex lg:items-center gap-2'><FaHome></FaHome> <span className='font-bold'>Chittagong </span>: Agrabad Shopping Complex(2nd Floor), 1742 Sk. Mujib Road, Agrabad, Chittagong – 4100</h3>

                        <h2 className='flex lg:items-center gap-3'><FaPhoneAlt></FaPhoneAlt><span className='font-bold'>Phone</span>: +88 01813 340400, +88 01613 340400
                        </h2>
                        <h1 className='flex items-center gap-3'>
                            <MdEmail></MdEmail>
                            <span className='font-bold'>Email</span>:  info@medicamphub.net
                        </h1>
                        <h1 className='flex items-center gap-3'>
                            <MdEmail></MdEmail>
                            <span className='font-bold'>Wechat ID</span>::MediCampHub
                        </h1>
                    </div>
                    {/* this is form */}
                    <div className='grow'>
                        <h1 className='text-2xl font-semibold mb-5 text-center lg:text-left'><span className='text-[#B354A6]'>Get</span> In Touch With us</h1>
                        <form onSubmit={handleSubmit} className='text-center '>
                            <div className='lg:flex gap-5 lg:gap-12'>
                                <input className='border py-3 px-10 ' placeholder='name' name='text' type="text" />
                                <input className='border py-3 px-10 mt-5 lg:mt-0' placeholder='E-mail' name='email' type="email" />
                            </div>
                            <div className='lg:flex gap-5 lg:gap-12 mt-5'>
                                <input className='border py-3 px-10' placeholder='Phone NUmber' name='number' type="number" />
                                <input className='border py-3 px-10 mt-5 lg:mt-0' placeholder='Subject' name='subject' type="text" />
                            </div>

                            <textarea className='border mt-5 lg:w-full w-2/3' name="message" id="" placeholder='message' cols="73" rows="7"></textarea>
                  <input className='bg-[#B354A6] block md:ml-[350px] lg:ml-0 cursor-pointer ml-44
                    text-white p-1 mb-5 rounded-md ' type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
               <div className='mb-5'>
               <Map></Map>
               </div>
            </div>
        </div>
    );
};

export default ContactUs;