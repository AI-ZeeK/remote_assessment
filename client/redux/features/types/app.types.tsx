export interface QueryParamsTypes {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export interface AppInitialTypes {
  openSubNav: boolean;
  rerender: number;
  categories: any[];
  recipe: null | {
    id?: string;
    title: string;
    description: string;
    file: string;
    instructions: string;
    ingredients: string[];
    created_at: string;
  };
  recipes: any[];
  recipesMeta: {
    current_page: number;
    page_size: number;
    total_count: number;
    total_pages: number;
    has_next_page: boolean;
    has_previous_page: boolean;
  };
}
