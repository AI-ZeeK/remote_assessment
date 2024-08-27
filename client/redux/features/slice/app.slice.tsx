import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../constants/app.constants";

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setRerender: (state) => {
      if (state.rerender >= 10) {
        state.rerender = 0;
      }
      state.rerender = state.rerender + 1;
    },
    updateCategories(state, { payload }) {
      state.categories = payload;
    },
    updateRecipes(state, { payload }) {
      state.recipes = payload.recipes;
      state.recipesMeta = payload.meta;
    },
    updateRecipe(state, { payload }) {
      state.recipe = payload;
    },
    closeSubNav(state) {
      state.openSubNav = false;
    },
    toggleSubNav(state) {
      state.openSubNav = !state.openSubNav;
    },
  },
});

export const {
  closeSubNav,
  toggleSubNav,
  updateCategories,
  updateRecipe,
  updateRecipes,
  setRerender,
} = appSlice.actions;
export default appSlice.reducer;
