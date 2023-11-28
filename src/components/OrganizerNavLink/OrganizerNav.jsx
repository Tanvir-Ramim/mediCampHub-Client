import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdLibraryAdd } from "react-icons/md";
import { FaCashRegister } from "react-icons/fa";
import { GiCampingTent } from "react-icons/gi";

const OrganizerNav = () => {
    return (
        <div>
            <ul className="p-4 space-y-6">
                <li className="flex gap-2 "><CgProfile className=" text-xl mt-1  " /> <NavLink to='/dashboard/organizer-profile' className={({ isActive }) => isActive ? "text-white bg-gray-600  rounded-md px-2  text-lg font-semibold" : "text-white text-lg   px-2  font-semibold"}>
                    Organizer Profile
                </NavLink></li>


                <li className="flex gap-2 "><MdLibraryAdd className=" text-xl mt-1 " /> <NavLink to='/dashboard/add-a-camp' className={({ isActive }) => isActive ? "text-white bg-gray-600 rounded-md  px-2  text-lg font-semibold" : "text-white  text-lg px-2   font-semibold"}>
                    Add A Camp
                </NavLink></li>


                <li className="flex gap-2 "><GiCampingTent className=" text-xl mt-1 " /> <NavLink to='/dashboard/manage-camps' className={({ isActive }) => isActive ? "text-white bg-gray-600 rounded-md  px-2  text-lg font-semibold" : "text-white  text-lg px-2   font-semibold"}>
                    Manage Camps
                </NavLink></li>

                <li className="flex gap-2 "><FaCashRegister className=" text-xl mt-1 " /> <NavLink to='/dashboard/manage-registered-camps' className={({ isActive }) => isActive ? "text-white bg-gray-600 rounded-md  px-2  text-lg font-semibold" : "text-white  text-lg px-2   font-semibold"}>
                    Manage Registered
                </NavLink></li>

               

            </ul>
        </div>
    );
};

export default OrganizerNav;