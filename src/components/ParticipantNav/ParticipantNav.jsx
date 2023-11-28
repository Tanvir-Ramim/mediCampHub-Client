import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { GiArchiveRegister } from "react-icons/gi";
import { MdPayment } from "react-icons/md";
import { RiFeedbackFill } from "react-icons/ri";


const ParticipantNav = () => {
    return (
        <div>
             <ul className="p-4 space-y-6">
                <li className="flex gap-2 "> <CgProfile className=" text-xl mt-1  " /> <NavLink to='/dashboard/organizer-profile' className={({ isActive }) => isActive ? "text-white bg-gray-600  rounded-md px-2  text-lg font-semibold" : "text-white text-lg   px-2  font-semibold"}>
                Participant Profile
                </NavLink></li>
     

                <li className="flex gap-2 "> <GiArchiveRegister className=" text-xl mt-1"/> <NavLink to='/dashboard/registered-camps-p' className={({ isActive }) => isActive ? "text-white bg-gray-600 rounded-md  px-2  text-lg font-semibold" : "text-white  text-lg px-2   font-semibold"}>
                    Register Camps
                </NavLink></li>


                <li className="flex gap-2  "> <MdPayment className=" text-xl mt-1" /> <NavLink to='/dashboard/payment-history' className={({ isActive }) => isActive ? "text-white bg-gray-600 rounded-md  px-2  text-lg font-semibold" : "text-white  text-lg px-2   font-semibold"}>
                Payment History
                </NavLink></li>

                <li className="flex gap-2 "> <RiFeedbackFill className=" text-xl mt-1" /> <NavLink to='/dashboard/feedBack-ratings' className={({ isActive }) => isActive ? "text-white bg-gray-600 rounded-md  px-2  text-lg font-semibold" : "text-white  text-lg px-2   font-semibold"}>
                Feedback and Ratings
                </NavLink></li>

               

            </ul>
        </div>
    );
};

export default ParticipantNav;