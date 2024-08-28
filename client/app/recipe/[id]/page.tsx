"use client";
import { openComponentModal } from "@/redux/features/slice/modal.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { MdEditNote, MdOutlineDeleteOutline } from "react-icons/md";
import Image from "next/image";
import SpinnerPage from "@/components/Spinner/Spinner";
import { useFetchRecipeMutation } from "@/redux/services/recipe.service";
import { motion } from "framer-motion";
import { MODAL_ENUM } from "@/redux/features/types";

type Props = {};

const Page = (props: Props) => {
  const param = useParams();
  const router = useRouter();
  const [fetchRecipe, { isLoading }] = useFetchRecipeMutation();
  const dispatch = useAppDispatch();
  const { recipe } = useAppSelector((state) => state.app);

  useEffect(() => {
    if (!recipe) router.push("/");
  }, [recipe]);

  useEffect(() => {
    fetchRecipe(param.id);
  }, [param.id]);

  return (
    <motion.main
      key={"home-page"}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ delay: 0.25, ease: "easeOut", duration: 0.25 }}
      className="min-h-screen"
    >
      <div className="p-4 w-full flex-col flex justify-between gap-4">
        <div className="flex gap-4 w-full justify-end px-4 items-center">
          <span
            className="bg-indigo-600 text-white w-10 h-10 flex justify-center items-center cursor-pointer"
            onClick={() =>
              dispatch(
                openComponentModal({
                  component: MODAL_ENUM.RECIPE_MODAL,
                  data: JSON.stringify(recipe),
                })
              )
            }
          >
            <MdEditNote fontSize={24} />
          </span>
          <span
            className="bg-rose-600 text-white w-10 h-10 flex justify-center items-center cursor-pointer"
            onClick={() =>
              dispatch(
                openComponentModal({
                  component: MODAL_ENUM.DELETE_MODAL,
                  data: `${recipe?.id}`,
                })
              )
            }
          >
            <MdOutlineDeleteOutline fontSize={24} />
          </span>
        </div>
        <div
          className="flex flex-col gap-2 cursor-pointer text-black  relative"
          key={recipe?.id}
        >
          {" "}
          <div className={`relative overflow-hidden`}>
            <Image
              src={recipe?.file as string}
              alt=""
              width={1000}
              height={1000}
              loading="lazy"
              className="md:h-72 h-64 w-full object-cover "
            />
          </div>
          <div
            className="flex flex-col gap-2 p-2 "
            onClick={() => router.push(`/recipe/${recipe?.id}`)}
          >
            <h4 className="font-semibold text-lg uppercase">{recipe?.title}</h4>
            <div className="h-[2px] w-full bg-emerald-800 opacity-20" />

            <div className="flex gap-1 justify-start items-center">
              <p className="text-base">{recipe?.description}</p>
            </div>
            <div className="h-[2px] w-full bg-primary-text" />
            <div className="flex  justify-start flex-wrap gap-2">
              <span className="text-base font-semibold">Ingredients - </span>
              <div className="flex justify-start flex-wrap gap-4">
                {recipe?.ingredients.map((item: any, i: any) => (
                  <div key={i} className="text-sm ">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-start flex-wrap pt-2 font-semibold">
              How to make
            </div>
            <div className="h-[2px] w-full bg-indigo-800 opacity-20" />

            <div className="flex justify-start flex-wrap gap-4 whitespace-pre-line">
              {recipe?.instructions}
            </div>
          </div>
        </div>
        {isLoading && <SpinnerPage />}
      </div>
    </motion.main>
  );
};

export default Page;
