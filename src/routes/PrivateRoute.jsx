import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const PrivateRoute = ({children}) => {
    const location=useLocation()
    const {user,loader}=useAuth()
     
    if(loader)
    {
         return  <Skeleton count={10} />
    }
        
    if(user && !loader){
        return children
   }

    return  <Navigate state={{from:location}} replace to='/login'></Navigate>
    
};

PrivateRoute.propTypes={
    children:PropTypes.node
}

export default PrivateRoute;