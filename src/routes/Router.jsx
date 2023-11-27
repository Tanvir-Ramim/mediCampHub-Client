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
import PrivateRoute from "./PrivateRoute";
import OrganizerRoute from "./OrganizerRoute";
import Details from "../pages/details/Details";
import ErrorPage from "../components/errorpage/ErrorPage";
import Update from "../pages/Update/Update";

  const Router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement:<ErrorPage></ErrorPage>,
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
          path: 'details/:id',
          element:<Details></Details>
        },
        {
          path: 'contactUs',
          element:<ContactUs></ContactUs>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'registration',
          element: <Registration></Registration>
        }
      ]
    },
    {
      
        path:'/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
          {
             path:'add-a-camp',
             element: <OrganizerRoute><AddACamp></AddACamp></OrganizerRoute>
          },
          {  
             path:'organizer-profile',
             element: <OrganizerRoute><OrganizerProfile></OrganizerProfile></OrganizerRoute>
          },
          {
             path:'manage-camps',
             element: <ManageCamps></ManageCamps>
          },
          {
             path:'manage-registered-camps',
             element: <PrivateRoute><ManageRegisterCamps></ManageRegisterCamps></PrivateRoute>
          },
          {
             path:'update-camp/:id',
             element: <Update></Update>
          }
        ]
      
    }
  ]);
export default Router;