import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../custom-query/customQuery";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  tagTypes: ["User", "Recipe", "Recipes"],
  endpoints: (builder) => ({}),
  keepUnusedDataFor: 50000,
  refetchOnReconnect: true,
});

export default apiSlice;
