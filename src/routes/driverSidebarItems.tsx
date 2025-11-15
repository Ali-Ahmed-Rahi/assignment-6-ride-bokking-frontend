import { ISidebarItem } from "@/types";
import { lazy } from "react";
const  AllRides = lazy(()=>import("@/pages/Driver/AllRide"))

export const driverSidebarItems: ISidebarItem[]=[
    {
      title: "DashBoard",
      items: [
        {
          title: "All Ride",
          url: "/driver/rides",
          component:AllRides
        },
      ],
    },
 ]

