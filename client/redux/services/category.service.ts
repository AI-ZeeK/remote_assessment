import { updateCategories } from "../features/slice/app.slice";
import { updateUser } from "../features/slice/user.slice";
import apiSlice from "./api/api";
import { CATEGORY } from "./CONSTANTS";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Register users

    // Login user
    categry: builder.query({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_DEV_API}${CATEGORY}`,
        method: "GET",
      }),
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateCategories(data.data));
        } catch (error) {
          return;
        }
      },
      transformResponse: (response) => {
        return response;
      },
    }),
    // Login user
  }),
  overrideExisting: true,
});

export const { useCategryQuery } = categoryApiSlice;
