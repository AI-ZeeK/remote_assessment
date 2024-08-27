"use client";
import RecipeCard from "@/components/Card/RecipeCard";
import { openComponentModal } from "@/redux/features/slice/modal.slice";
import { logoutUser } from "@/redux/features/slice/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useFetchUserRecipesMutation } from "@/redux/services/recipe.service";
import { Avatar, Flex, WrapItem } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { Fragment, useEffect } from "react";

type Props = {};
const Page = (props: Props) => {
  // const { user } = useAppSelector((state) => state.user);
  // const dispatch = useAppDispatch();
  // const [fetch, { data }] = useFetchUserRecipesMutation();

  // const { recipes, deleteUpdate } = useAppSelector((state) => state.app);

  // const fetchRecipes = async () => {
  //   await fetch({});
  // };

  // useEffect(() => {
  //   if (user) fetchRecipes();
  //   dispatch(resetDeleteUpdate());
  // }, [dispatch, deleteUpdate]);

  return (
    <motion.main
      key={"home-page"}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ delay: 0.25, ease: "easeOut", duration: 0.25 }}
      className="min-h-screen p-2 flex flex-col gap-4"
    >
      {/* <div className="p-4 w-full flex justify-between gap-4">
        <WrapItem>
          <Avatar cursor={"pointer"} size="xl" name={user?.firstname} />
        </WrapItem>
        <div className="grid grid-cols-[1fr_5fr] gap-3 w-full">
          <div className="grid">
            <span>Firstname: </span>
            <span>Lastname: </span>
            <span>Email: </span>
          </div>
          <div className="grid">
            <span className="capitalize">{user?.firstname}</span>
            <span className="capitalize">{user?.lastname}</span>
            <span className="capitalize">{user?.email}</span>
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-slate-400" />
      <div className="flex justify-end items-center">
        <button
          onClick={() => {
            dispatch(
              openComponentModal({
                component: "LogoutModal",
                data: "",
              })
            );
          }}
          className="bg-slate-800 hover:bg-slate-600 text-white px-6 p-2 uppercase text-sm cursor-pointer"
        >
          Logout
        </button>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 p-4">
        {recipes.length ? (
          recipes.map((recipe) => (
            <Fragment key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </Fragment>
          ))
        ) : (
          <div className="p-4 uppercase">
            No recipe yet, you can add one yourself
          </div>
        )}
      </div> */}
    </motion.main>
  );
};

export default Page;
