import {
  updateCategories,
  updateRecipe,
  updateRecipes,
} from "../features/slice/app.slice";
import { updateUser } from "../features/slice/user.slice";
import apiSlice from "./api/api";
import { RECIPES, USER_RECIPES } from "./CONSTANTS";

const recipesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserRecipes: builder.mutation({
      query: (body) => ({
        url: `${process.env.NEXT_PUBLIC_DEV_API}${USER_RECIPES}/${body}`,
        method: "GET",
      }),
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            updateRecipes({
              recipes: data.data,
            })
          );
        } catch (error) {
          return;
        }
      },
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: ["Recipes"],
    }),
    fetchRecipes: builder.query({
      query: (body) => ({
        url: `${process.env.NEXT_PUBLIC_DEV_API}${RECIPES}?page=${body.page}&page_size=${body.page_size}`,
        method: "GET",
      }),
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            updateRecipes({
              meta: data.data.meta,
              recipes: data.data.recipes,
            })
          );
        } catch (error) {
          return;
        }
      },
      transformResponse: (response) => {
        return response;
      },
    }),
    fetchRecipe: builder.mutation({
      query: (id) => ({
        url: `${process.env.NEXT_PUBLIC_DEV_API}${RECIPES}/${id}`,
        method: "GET",
      }),
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateRecipe(data.data));
        } catch (error) {
          return;
        }
      },
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: (result, error, id) => [{ type: "Recipe", id }],
    }),
    deleteRecipe: builder.mutation({
      query: (id) => ({
        url: `${process.env.NEXT_PUBLIC_DEV_API}${RECIPES}/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateRecipe(data.data));
        } catch (error) {
          return;
        }
      },
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: (result, error, id) => [{ type: "Recipe", id }],
    }),
    createRecipe: builder.mutation({
      query: (body: {
        title: string;
        description: string;
        category_id: string;
        ingredients: string;
        file: string;
        instructions: string;
      }) => ({
        url: `${process.env.NEXT_PUBLIC_DEV_API}${RECIPES}`,
        method: "POST",
        body,
      }),
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          return;
        }
      },
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: ["Recipe"],
    }),
    updateRecipe: builder.mutation({
      query: ({
        id,
        ...body
      }: {
        id: string;
        title: string;
        description: string;
        category_id: string;
        ingredients: string;
        file: string;
        instructions: string;
      }) => ({
        url: `${process.env.NEXT_PUBLIC_DEV_API}${RECIPES}/${id}`,
        method: "PUT",
        body,
      }),
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          return;
        }
      },
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: ["Recipe"],
    }),

    // Login user
  }),
  overrideExisting: true,
});

export const {
  useCreateRecipeMutation,
  useFetchRecipesQuery,
  useFetchRecipeMutation,
  useDeleteRecipeMutation,
  useFetchUserRecipesMutation,
  useUpdateRecipeMutation,
} = recipesApiSlice;
