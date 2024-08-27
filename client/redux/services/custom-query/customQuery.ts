import { fetchBaseQuery, BaseQueryApi } from "@reduxjs/toolkit/query/react";
// import type { BaseQueryResult } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { RootState } from "@/redux/store";
import { logoutUser } from "@/redux/features/slice/user.slice";
import { closeModal } from "@/redux/features/slice/modal.slice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_DEV_API,
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    const typedGetState: any = getState() as RootState;
    const { token } = typedGetState.user;
    // console.log(`Token: ${token}`);
    // if (token) {
    //   headers.set("authorization", `Bearer ${token}`);
    // }

    return headers;
  },
});

const customBaseQuery = async (
  args: Parameters<typeof baseQuery>[0],
  api: BaseQueryApi,
  extraOptions: object
): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  // if (result.error && result.error.status === 401) {
  //   api.dispatch(closeModal());
  //   api.dispatch(logoutUser());
  // }
  return result;
};

export default customBaseQuery;
