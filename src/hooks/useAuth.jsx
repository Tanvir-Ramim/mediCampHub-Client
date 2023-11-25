import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";


const useAuth = () => {
     const authProvider=useContext(AuthContext)


    return authProvider
};

export default useAuth;