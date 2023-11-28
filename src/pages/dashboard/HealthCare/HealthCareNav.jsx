import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { MdManageAccounts } from "react-icons/md";

const HealthCareNav = () => {
    return (
        <div>
             <ul className="p-4 space-y-6">
                <li className="flex gap-2 "> <CgProfile className=" text-xl mt-1  " /> <NavLink to='/dashboard/organizer-profile' className={({ isActive }) => isActive ? "text-white bg-gray-600  rounded-md px-2  text-lg font-semibold" : "text-white text-lg   px-2  font-semibold"}>
                Healthcare Professional
                </NavLink></li>
     

                <li className="flex gap-2 "> <MdManageAccounts className=" text-xl mt-1  " /> <NavLink to='/dashboard/manage-camps-care' className={({ isActive }) => isActive ? "text-white bg-gray-600 rounded-md  px-2  text-lg font-semibold" : "text-white  text-lg px-2   font-semibold"}>
                    Manage Camps
                </NavLink></li>


                

               

            </ul>
        </div>
    );
};

export default HealthCareNav;