import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'
import PropTypes from 'prop-types';


const OrganizerRoute = ({children}) => {   
    const location=useLocation()
    const {user,loader}=useAuth()
    const {role,isLoading} = useRole()
     
    if(loader || isLoading)
    {
        return <Skeleton count={10} />
    }

   if(user && role==='Organizer'){
    return children
   }

    return <Navigate state={{from:location}} replace to='/login'></Navigate>
    
};
OrganizerRoute.propTypes={
    children:PropTypes.node
}


export default OrganizerRoute;