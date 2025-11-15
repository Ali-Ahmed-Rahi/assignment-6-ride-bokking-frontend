import { baseApi } from "@/redux/baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDriverRides: builder.query({
      query: () => ({
        url: "/ride/me/driver",//
        method: "GET"
      }),
    }),
    acceptRide: builder.mutation({
      query: ({ id }) => ({
        url: `/ride/${id}/accept`,
        method: "PATCH"
      }),
    }),
    rejectRide: builder.mutation({
      query: ({ id }) => ({
        url: `/ride/${id}/reject`,
        method: "PATCH"
      }),
    }),
    updateRideStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/ride/${id}/status`,
        method: "PATCH",
        data: { status },
      }),
    }),
    completeRide: builder.mutation({
      query: ({ id }) => ({
        url: `/ride/${id}/complete`,
        method: "PATCH"
      }),
    }),
    setAvailability: builder.mutation({
      query: ({ available }) => ({
        url: "/drivers/availability",
        method: "PATCH",
        data: { available },
      }),
    }),
    getEarnings: builder.query({
      query: () => ({
        url: "/drivers/earnings",
        method: "GET"
      }),
    }),

    // Admin Actions for Drivers 
    getAllDriversAdmin: builder.query({  //
      query: () => ({
        url: "/drivers",
        method: "GET"
      }),
    }),
    getDriverByIdAdmin: builder.query({ //
      query: ({ id }) => ({
        url: `/drivers/${id}`,
        method: "GET"
      }),
    }),
    approveDriver: builder.mutation({ //
      query: (id: string) => ({
        url: `/drivers/${id}/approve`,
        method: "PATCH"
      }),
    }),
    suspendDriver: builder.mutation({  //
      query: (id: string) => ({
        url: `/drivers/${id}/suspend`,
        method: "PATCH"
      })
    }),

  }),
});

export const {
  useGetDriverRidesQuery,
  useAcceptRideMutation,
  useRejectRideMutation,
  useUpdateRideStatusMutation,
  useCompleteRideMutation,
  useSetAvailabilityMutation,
  useGetEarningsQuery,
  useGetAllDriversAdminQuery,
  useGetDriverByIdAdminQuery,
  useApproveDriverMutation,
  useSuspendDriverMutation,
} = driverApi;
