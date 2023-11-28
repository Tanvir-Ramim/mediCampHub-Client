// import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Authentication/AuthProvider";
import { useContext } from "react";
// import { AuthContext } from "../authentication/AuthProvider";



const AuthButton = () => {
     const {user,userLogOut}=useContext(AuthContext)
    
     const handleLogOut=()=>{
        userLogOut()
     }
         return (
        <div className=" cursor-pointer md:ml-8 md:mt-0 mt-4 bg-[#B354A6] text-white text-xl rounded-3xl hover:bg-[#7c4e77] ">
             {
                user? <div className="flex gap-3 items-center py-2 px-6 relative group">
                     <h1>{user.displayName}</h1>
                     <button onClick={handleLogOut} className="bg-[#11192BA8] text-white py-1 z-10 px-4 rounded absolute top-10 right-12 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                                    LogOut
                 </button>
                </div> 
                :
                <Link to='/login'><button className=" px-6 md:py-3 py-2"> Create An Account</button></Link>
             }
        </div>
    );
};

export default AuthButton;