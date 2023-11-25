import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../Authentication/AuthProvider";
import useAxiosNormal from "../../hooks/useAxiosNormal";
import Swal from "sweetalert2";

const Registration = () => {
    const{createUser,setUser,user}=useContext(AuthContext)
      const axiosNormal=useAxiosNormal()
        const [error,setError]=useState(null)
        const navigate=useNavigate()
       const handleRegister=(e)=>{
        e.preventDefault()
        const name=e.target.name.value
        const role=e.target.role.value
        const email=e.target.email.value
        const password=e.target.password.value
        setError('')
        if(password.length<6){
          return setError('Password should be at least 6 characters')
        } 
        else if(!/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=.*\d).*$/g.test(password)){
         return setError('Must have a UpperCase and Special Character')
        }
          
           createUser(email,password)
          .then((result)=>{
             
            //    toast.success('Successfully Register')
               updateProfile(result.user,{
                  displayName: name,
               })
               .then((result)=>{
                
                   setUser({...user,displayName:name})
                   const userInfo={
                       name,
                       email,
                       role
                   }
                   console.log(userInfo)
                   axiosNormal.post('/users',userInfo)
                   .then(res=>{
                     console.log(res.data)
                     if(res.data.insertedId){
                      e.target.reset();
                      Swal.fire({
                          position: 'top-end',
                          icon: 'success',
                          title: 'User created successfully.',
                          showConfirmButton: false,
                          timer: 1500
                      });
                    }
                   })
                   
               })
               navigate('/')
          })
          .catch(error=>{
              setError(error.message)
          })
        
       }
    return (
        <div>
        <div className="hero min-h-screen  mb-5">
<div className="hero-content flex-col lg:flex-row-reverse">
<div className="text-center lg:text-left">
  <h1 className="text-5xl font-bold text-[#11192BA8]"> Register Now</h1>
 
</div>
<div className="card flex-shrink-0 w-full md:min-w-[440px] max-w-sm shadow-2xl bg-base-100">
  <form  onSubmit={handleRegister}  className="card-body bg-[#B354A6] ">
    <div className="form-control">
      <label className="label">
        <span className="label-text text-white text-lg">Name</span>
      </label>
      <input name="name" type="text" placeholder="name" className="input input-bordered" required />
    </div>
    {/* <div className="form-control">
      <label className="label">
        <span className="label-text text-white text-lg">Photo URL</span>
      </label>
      <input name="url" type="text" placeholder="URL" className="input  input-bordered" required />
    </div> */}
    <div className="form-control">
      <label className="label">
        <span className="label-text text-white text-lg">Email</span>
      </label>
      <input name="email" type="email" placeholder="email" className="input input-bordered" required />
    </div>
    <div className="form-control ">
      <div className="flex gap-2">
      <div className="w-1/2">
      <label className="label">
        <span className="label-text text-white text-lg">Password</span>
      </label>
      <input name="password" type="password" placeholder="password" className="input w-full input-bordered" required />
      </div>
      <div className="w-1/2">
      <label className="label">
        <span className="label-text text-white text-lg">Select Role</span>
      </label>
      <select name="role" defaultValue='default' className="select select-bordered">
    <option >Participant</option>
    <option  value='Organizer'>Organizer</option>
    <option >Healthcare Professional</option>
    
    
  </select>
      </div>
      </div>
    </div>
    <div className="form-control mt-6">
      <button className="btn btn-neutral">Submit</button>
    </div>
    <div className="text-white text-lg"><Link to='/logIn' >Go <span className="font-bold text-red-500 underline">Login</span> Page</Link></div>
    <div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  </form>
</div>
</div>
</div>
</div>
    );
};

export default Registration;