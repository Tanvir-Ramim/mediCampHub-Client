import { NavLink, Outlet } from "react-router-dom";
import useRole from "../../hooks/useRole";
import MainDiv from "../../shared/MainDiv/MainDiv";
import OrganizerNav from "../../components/OrganizerNavLink/OrganizerNav";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FaHome } from "react-icons/fa";
import ParticipantNav from "../../components/ParticipantNav/ParticipantNav";
import { Helmet } from "react-helmet-async";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaCampground } from "react-icons/fa6";
import HealthCareNav from "./HealthCare/HealthCareNav";

const Dashboard = () => {
  const { role, isLoading,isPending } = useRole()
  if (isLoading || isPending) {
    return <Skeleton count={10} />
  }
  return (
    <MainDiv>
      <Helmet><title>MCH | Dashboard</title></Helmet>
      <div className="flex md:flex-row flex-col">
        <div className="md:min-h-screen bg-[#B354A6] ">
          {
            role === "Organizer" &&
            <OrganizerNav></OrganizerNav>

          }
          
          {
             role ==='Participant' && <ParticipantNav></ParticipantNav>
          }
          {
             role ==='Healthcare Professional' && <HealthCareNav></HealthCareNav>
          }

          <div className="divider">OR</div>


          <ul className="p-4 space-y-6">
            <li className="flex gap-2 "><FaHome className=" text-xl mt-1 " /> <NavLink to='/' className={"text-white  text-lg px-2  font-semibold"}>
              Home
            </NavLink></li>


            <li className="flex gap-2 "><FaCampground className=" text-xl mt-1 " /> <NavLink to='/availableCamps' className={"text-white  text-lg px-2  font-semibold"}>
            Available Camps
            </NavLink></li>

            <li className="flex gap-2 "><FaPhoneSquareAlt className=" text-xl mt-1 "  /> <NavLink to='/contactUs' className={"text-white  text-lg px-2  font-semibold"}>
            Contact Us
            </NavLink></li>
          </ul>



        </div>
        <div className="flex-1 ">
          <Outlet></Outlet>
        </div>
      </div>
    </MainDiv>
  );
};

export default Dashboard;