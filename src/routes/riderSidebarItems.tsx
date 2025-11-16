
import { MyAllRides } from "@/pages/Rider/MyRides";
import RequestRide from "@/pages/Rider/RequestRide";
import { ISidebarItem } from "@/types";


export const riderSidebarItems: ISidebarItem[]=[
    {
      title: "DashBoard",
      items: [
        {
          title: "My_Ride_Booking",
          url: "/rider/rides/request",
          component:RequestRide,
        },
        {
          title: "My_Rides",
          url: "/rider/rides/me",
          component:MyAllRides,
        },
      ],
    },
 ]

