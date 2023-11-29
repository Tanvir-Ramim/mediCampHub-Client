import useAuth from "../../hooks/useAuth";
import PropTypes from 'prop-types';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const RegisterPage = ({id,participant,refetch,forRegister}) => {
        
        const newParticipant=participant+1
      
        const {user}=useAuth()
        const axiosSecure=useAxiosSecure()
        const  closeModal = () => {
          document.getElementById('my_modal_3').close();
        };

         
      const{name:CampName,scheduled,location,fees,campEmail}=forRegister ||{}
      

     const handleRegister=async(e)=>{
        e.preventDefault()
        const form=e.target 
        const name =form.name.value 
        const age =form.age.value 
        const gender =form.gender.value 
        const phone =form.phone.value 
        const address =form.address.value 
        const campId= id
        const userMail=user.email
        const paymentStatus='Pay'
        const ConfirmationStatus='pending'
        const registerInfo={
          name,age,gender,phone,address,campId,userMail,paymentStatus,ConfirmationStatus,CampName,scheduled,location,fees,campEmail
        }
          const res=await axiosSecure.post('/register',registerInfo)
          if(res.data.insertedId){
            form.reset()
            toast.success('Successfully Register')
            closeModal();
              
              const info={id,newParticipant }
            axiosSecure.put('/participate',info)
            .then(res=>{
                if(res.data.modifiedCount){
                  refetch()
                }
            })
          }

        
     }
    return (
        <div>
            <button className="bg-[#B354A6] text-white px-2 rounded-md" onClick={()=>document.getElementById('my_modal_3').showModal()}>Registration Now</button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h1 className="text-center text-xl mb-5 text-[#B354A6]">Provide Us Your Info</h1>
    <form  onSubmit={handleRegister}>
         <div className="flex  gap-3 ">
           <div className=" w-1/2">
           <p>Name*</p>
          <input  className="border-2 w-full"  type="text" name="name" required />
           </div>
           <div className="w-3/12">
            <p>Age*</p>
          <input className="border-2 w-full" type="number" name="age"  required/>
           </div>
           <div className="w-3/12">
            <p>Gender*</p>
             <select defaultValue="default" className="border-2 w-full " name="gender" required>
              <option disabled value="default">select</option>
              <option >Male</option>
              <option >Female</option>
             </select>
           </div>
         </div>
         <div className="flex gap-3 mt-4">
         <div className="w-full">
            <p>Address*</p>
          <input className="border-2 w-full" type="type" name="address" required />
           </div>
         <div className="w-full">
            <p>Phone*</p>
          <input className="border-2 w-full" type="number" name="phone"required />
           </div>
         </div>
          <div className="flex justify-center mt-4 ">
          <input className="bg-[#B354A6] cursor-pointer text-white px-2 rounded-md" type="submit" value="Submit" />
          </div>
    </form>
  </div>
</dialog>
        </div>
    );
};

RegisterPage.propTypes={
    id: PropTypes.string,
    participant: PropTypes.number,
    refetch: PropTypes.func,
    forRegister:PropTypes.object
}

export default RegisterPage;