import { AppInitialTypes, QueryParamsTypes } from "../types/app.types";

export const initialState: AppInitialTypes = {
  openSubNav: false,
  categories: [],
  recipes: [],
  recipesMeta: {
    current_page: 0,
    page_size: 0,
    total_count: 0,
    total_pages: 0,
    has_next_page: false,
    has_previous_page: false,
  },
  recipe: null,
  rerender: 0,
};
