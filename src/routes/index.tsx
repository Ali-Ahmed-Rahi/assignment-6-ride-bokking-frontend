import App from "@/App";
import DashBoardLayout from "@/components/layout/DashBoardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { driverSidebarItems } from "./driverSidebarItems";
import { riderSidebarItems } from "./riderSidebarItems";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorised";
import { TRole } from "@/types";
import { role } from "@/constants/role";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: withAuth(About),
        path: "about",
      },
    ],
  },
  {
    Component: withAuth(DashBoardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      { index:true,element:<Navigate to='/admin/drivers'/>},
      ...generateRoutes(adminSidebarItems)],
  },
  {
    Component: withAuth(DashBoardLayout,role.driver as TRole),
    path: "/driver",
    children: [{ index:true,element:<Navigate to='/driver/rides'/>},...generateRoutes(driverSidebarItems)],
  },
  {
    Component: withAuth(DashBoardLayout,role.rider as TRole),
    path: "/rider",
    children: [{ index:true,element:<Navigate to='/rides/request'/>},...generateRoutes(riderSidebarItems)],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
]);
