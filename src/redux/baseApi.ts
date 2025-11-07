import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseApi=createApi({
reducerPath:"baseApi",
baseQuery:fetchBaseQuery({baseUrl:"https://ride-booking-api-orcin.vercel.app"}),
endpoints:()=>({})
})