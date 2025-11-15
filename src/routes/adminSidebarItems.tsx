import AllDrivers from "@/pages/Admin/AllDrivers";
import AllRidersFeatures from "@/pages/Admin/AllRidersFeatures";
import AllRides from "@/pages/Admin/AllRides&Rider";
import { ISidebarItem } from "@/types";

export const adminSidebarItems: ISidebarItem[]=[
    {
      title: "DashBoard",
      items: [
        {
          title: "Drivers_Features",
          url: "/admin/drivers",
          component:AllDrivers
        },
        {
          title: "Ride_Features",
          url: "/admin/rides",
          component:AllRides
        },
        {
          title: "Rider_Features",
          url: "/admin/riders",
          component:AllRidersFeatures
        },
      ],
    },
 ]

 