// riderApi.ts
import { baseApi } from "@/redux/baseApi";

export const riderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ------------------- Rider Actions -------------------
    requestRide: builder.mutation({
      query: (rideInfo) => ({
        url: "/rides/request",
        method: "POST",
        data: rideInfo,
      }),
    }),
    cancelRide: builder.mutation({
      query: ({ id }) => ({
        url: `/rides/${id}/cancel`,
        method: "PATCH",
      }),
    }),
    getMyRides: builder.query({
      query: () => ({ url: "/rides/me", method: "GET" }),
    }),

    // ------------------- Admin Actions for Riders/Users -------------------
    getRidersAdmin: builder.query({ //
      query: () => ({
        url: "/admin/riders",
        method: "GET"
      }),
    }),
    getUserByIdAdmin: builder.query({//
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "GET"
      }),
    }),
    updateUserAdmin: builder.mutation({//
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        data,
      }),
    }),
    blockUserAdmin: builder.mutation({//
      query: ({ id }) => ({
        url: `/users/${id}/block`,
        method: "PATCH"
      }),
    }),
    unblockUserAdmin: builder.mutation({//
      query: ({ id }) => ({
        url: `/users/${id}/unblock`,
        method: "PATCH"
      }),
    }),
    getAllRidesAdmin: builder.query({//
      query: () => ({
        url: "/admin/rides",
        method: "GET"
      }),
    }),

  }),
});

export const {
  // Rider hooks
  useRequestRideMutation,
  useCancelRideMutation,
  useGetMyRidesQuery,

  // Admin hooks for riders/users
  useGetRidersAdminQuery,
  useGetUserByIdAdminQuery,
  useUpdateUserAdminMutation,
  useBlockUserAdminMutation,
  useUnblockUserAdminMutation,
  useGetAllRidesAdminQuery,
} = riderApi;
