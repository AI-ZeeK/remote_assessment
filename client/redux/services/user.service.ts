import { updateUser } from "../features/slice/user.slice";
import apiSlice from "./api/api";
import { LOGIN, SIGNUP } from "./CONSTANTS";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Register users

    // Login user
    login: builder.mutation({
      query: (userData: any) => ({
        url: `${process.env.NEXT_PUBLIC_DEV_API}${LOGIN}`,
        body: userData,
        method: "POST",
      }),
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const { token } = data.data;
          const { data: user } = data;
          if (!token) {
            throw new Error("Token is missing in the response");
          }
          dispatch(
            updateUser({
              token,
              user,
            })
          );
        } catch (error) {
          return;
        }
      },
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: ["User"],
    }),
    // Login user
    signup: builder.mutation({
      query: (userData: any) => ({
        url: `${process.env.NEXT_PUBLIC_DEV_API}${SIGNUP}`,
        body: userData,
        method: "POST",
      }),
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const { token } = data.data;
          const { data: user } = data;
          if (!token) {
            throw new Error("Token is missing in the response");
          }

          dispatch(
            updateUser({
              token,
              user,
            })
          );
        } catch (error) {
          return;
        }
      },
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useSignupMutation } = userApiSlice;
