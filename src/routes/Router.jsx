import {
    createBrowserRouter,
    
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import AvailableCamps from "../pages/availableCamps/AvailableCamps";
import Dashboard from "../pages/dashboard/Dashboard";
import ContactUs from "../pages/contactUs/ContactUs";
import Login from "../pages/login/login";
import Registration from "../pages/registration/Registration";
import AddACamp from "../pages/dashboard/addACamp/AddACamp";
import OrganizerProfile from "../pages/dashboard/OrganizerProfile/OrganizerProfile";
import ManageCamps from "../pages/dashboard/manageCamps/ManageCamps";
import ManageRegisterCamps from "../pages/dashboard/ManageRegisteredCamps/ManageRegisterCamps";

  const Router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            index: true, 
            element:<Home></Home>
        },
        {
          path: 'availableCamps',
          element:<AvailableCamps></AvailableCamps>
        },
        {
          path: 'contactUs',
          element:<ContactUs></ContactUs>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/registration',
          element: <Registration></Registration>
        }
      ]
    },
    {
      
        path:'/dashboard',
        element: <Dashboard></Dashboard>,
        children:[
          {
             path:'add-a-camp',
             element: <AddACamp></AddACamp>
          },
          {  
             path:'organizer-profile',
             element: <OrganizerProfile></OrganizerProfile>
          },
          {
             path:'manage-camps',
             element: <ManageCamps></ManageCamps>
          },
          {
             path:'manage-registered-camps',
             element: <ManageRegisterCamps></ManageRegisterCamps>
          }
        ]
      
    }
  ]);
export default Router;