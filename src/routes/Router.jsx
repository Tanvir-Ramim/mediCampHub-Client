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
import RegisteredCamps from "../pages/AllParticipant/RegisteredCamps/RegisteredCamps";
import PaymentHistory from "../pages/AllParticipant/PaymentHistory/PaymentHistory";
import Feedback from "../pages/AllParticipant/Feedback/Feedback";
import PaymentPage from "../pages/AllParticipant/RegisteredCamps/PaymentPage";
import ManageCamCare from "../pages/dashboard/HealthCare/MangeCampCare/ManageCamCare";

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
          element: <PrivateRoute><Details></Details></PrivateRoute>
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
             element: <PrivateRoute><OrganizerProfile></OrganizerProfile></PrivateRoute>
          },
          {
             path:'manage-camps',
             element: <OrganizerRoute><ManageCamps></ManageCamps></OrganizerRoute>
          },
          {
             path:'manage-registered-camps',
             element: <OrganizerRoute><ManageRegisterCamps></ManageRegisterCamps></OrganizerRoute>
          },
          {
             path:'update-camp/:id',
             element: <OrganizerRoute><Update></Update></OrganizerRoute>
          },
          // route for Participant
          {
             path : 'registered-camps-p',
             element:<PrivateRoute><RegisteredCamps></RegisteredCamps></PrivateRoute>
          },
          {
             path : 'payment-history',
             element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
          },
          {
             path : 'feedBack-ratings',
             element: <PrivateRoute><Feedback></Feedback></PrivateRoute>
          },
          {
            path:'payment',
            element: <PrivateRoute><PaymentPage></PaymentPage></PrivateRoute>
          },
          // rout for healthcare
          {
            path:'manage-camps-care',
            element: <PrivateRoute><ManageCamCare></ManageCamCare></PrivateRoute>
          }
        ]
      
    }
  ]);
export default Router;