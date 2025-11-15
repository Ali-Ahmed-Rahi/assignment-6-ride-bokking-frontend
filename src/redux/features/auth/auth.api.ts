import { baseApi } from "@/redux/baseApi";

export const authApi=baseApi.injectEndpoints({
  endpoints:(builder)=>({
    register:builder.mutation({
      query:(userInfo)=>({
      url:"/auth/register",
      method:"POST",
      data:userInfo
      })
    }),
    login:builder.mutation({
      query:(userInfo)=>({
        url:"/auth/login",
        method:"POST",
        data:userInfo,
      })
    }),
    logout:builder.mutation({
      query:() =>({
        url:"/auth/logout",
        method:"POST",
      })
    }),
    getMe:builder.query({
      query:() =>({
        url:"/auth/me",
        method:"GET",
      })
    })
  })
})

export const {useRegisterMutation,useLoginMutation,useLogoutMutation,useGetMeQuery}=authApi;