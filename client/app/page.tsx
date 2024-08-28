"use client";
import RecipeCard from "@/components/Card/RecipeCard";
import { SelectInput } from "@/components/Input/Index";
import { openComponentModal } from "@/redux/features/slice/modal.slice";
import { MODAL_ENUM } from "@/redux/features/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useFetchRecipesQuery } from "@/redux/services/recipe.service";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [page_size, setPageSize] = useState(5);
  const { data, refetch } = useFetchRecipesQuery({ page_size, page });
  const { recipes, recipesMeta, rerender } = useAppSelector(
    (state) => state.app
  );

  useEffect(() => {
    refetch();
  }, [page, page_size, rerender]);

  return (
    <motion.main
      key={"home-page"}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ delay: 0.25, ease: "easeOut", duration: 0.25 }}
      className="min-h-screen"
    >
      <div className="p-4 w-full flex justify-between gap-4">
        <div className="w-24">
          <SelectInput
            name={"title"}
            value={String(page_size)}
            onChange={(e) => setPageSize(e.target.value)}
            options={["5", "10", "20"]}
            disabled={false}
          />
        </div>
        <button
          data-testid="add-recipe-button"
          onClick={() =>
            dispatch(
              openComponentModal({
                component: MODAL_ENUM.RECIPE_MODAL,
                data: "",
              })
            )
          }
          className="px-4 p-2 bg-emerald-600 hover:bg-emerald-500 transition-all rounded-md text-white"
        >
          Add Recipe
        </button>
      </div>
      <div
        data-testid="recipe-list"
        className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 p-4"
      >
        {recipes.length ? (
          recipes.map((recipe) => (
            <Fragment key={recipe.id}>
              <RecipeCard recipe={recipe} data-testid="recipe-card" />
            </Fragment>
          ))
        ) : (
          <div className="p-4 uppercase">
            No recipe yet, you can add one yourself
          </div>
        )}
      </div>
      <div className="flex justify-between items-center gap-4 w-full p-4">
        <button
          disabled={!recipesMeta.has_previous_page}
          onClick={() => {
            if (recipesMeta.has_previous_page) setPage((prev) => prev - 1);
          }}
          className={`px-4 p-2 ${
            !recipesMeta.has_previous_page
              ? "disabled:opacity-40 pointer-events-none"
              : ""
          } bg-slate-500 hover:bg-slate-300 transition-all rounded-sm text-white `}
        >
          Prev
        </button>
        <button
          disabled={!recipesMeta.has_next_page}
          onClick={() => {
            if (recipesMeta.has_next_page) setPage((prev) => prev + 1);
          }}
          className={`px-4 p-2 ${
            !recipesMeta.has_next_page
              ? "disabled:opacity-40 pointer-events-none"
              : ""
          } bg-slate-500 hover:bg-slate-300 transition-all rounded-sm text-white`}
        >
          Next
        </button>
      </div>
    </motion.main>
  );
}
