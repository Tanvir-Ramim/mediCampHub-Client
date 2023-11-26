import {  Outlet } from "react-router-dom";
import useRole from "../../hooks/useRole";
import MainDiv from "../../shared/MainDiv/MainDiv";
import OrganizerNav from "../../components/OrganizerNavLink/OrganizerNav";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Dashboard = () => {
    const {role,isLoading}=useRole()
    if(isLoading){
      return   <Skeleton count={10} />
    }
    return (
        <MainDiv>
            <div className="flex md:flex-row flex-col">
            <div className="md:min-h-screen bg-[#B354A6] ">
           {
            role ==="Organizer" && 
          <OrganizerNav></OrganizerNav>
  
           }
         


            </div>
            <div className="flex-1 ">
                 <Outlet></Outlet>
            </div>
        </div>
        </MainDiv>
    );
};

export default Dashboard;