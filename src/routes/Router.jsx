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
          path:'dashboard',
          element: <Dashboard></Dashboard>
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
  ]);
export default Router;