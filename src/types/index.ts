import { ComponentType } from "react";

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole="admin" | "driver" | "rider";


export interface Ride {
  driver?: { name?: string };
  rider?: { name?: string };
}