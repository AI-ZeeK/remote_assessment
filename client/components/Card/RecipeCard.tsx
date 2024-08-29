import { openComponentModal } from "@/redux/features/slice/modal.slice";
import React from "react";
import { MdEditNote, MdOutlineDeleteOutline } from "react-icons/md";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { MODAL_ENUM } from "@/redux/features/types";
import { CldImage } from "next-cloudinary";

type Props = {
  recipe: any;
};

const RecipeCard = ({ recipe }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-2 cursor-pointer text-black bg-emerald-200 relative w-full">
      <div className="absolute top-4 z-20 left-0 flex gap-4 w-full justify-end px-4 items-center">
        <span
          className="bg-white w-10 h-10 flex justify-center items-center"
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
          className="bg-white w-10 h-10 flex justify-center items-center"
          onClick={() =>
            dispatch(
              openComponentModal({
                component: MODAL_ENUM.DELETE_MODAL,
                data: recipe.id,
              })
            )
          }
        >
          <MdOutlineDeleteOutline fontSize={24} />
        </span>
      </div>
      <div className={`relative overflow-hidden`}>
        <CldImage
          src={recipe.file}
          alt=""
          width={200}
          height={200}
          className="md:h-72 h-64 w-full  object-cover object-right-top hover:scale-110 transition-all duration-700"
        />
      </div>
      <div
        className="flex flex-col gap-2 p-2 w-full flex-wrap"
        onClick={() => {
          router.push(`recipe/${recipe.id}`);
        }}
      >
        <h4 className="font-semibold text-lg uppercase">{recipe.title}</h4>
        <div className="flex gap-1 justify-start items-center">
          <p className="text-base">{recipe.description}</p>
        </div>
        <div className="h-[2px] w-full bg-primary-text" />
        <div className="flex justify-start flex-wrap gap-2">
          {recipe.ingredients.length > 10 ? (
            <>
              {recipe.ingredients.slice(0, 10).map((item: any, i: any) => (
                <div
                  key={i}
                  className="p-2 px-3 bg-emerald-700 text-white text-xs lg:text-sm"
                >
                  {item}
                </div>
              ))}
              <div className="p-2 px-3 bg-emerald-700 text-white text-xs lg:text-sm">
                ...
              </div>
            </>
          ) : (
            <>
              {recipe.ingredients.map((item: any, i: any) => (
                <div
                  key={i}
                  className="p-2 px-3 bg-emerald-700 text-white text-xs lg:text-sm"
                >
                  {item}
                </div>
              ))}
            </>
          )}
        </div>
        <div className="flex justify-start flex-wrap pt-2 font-semibold">
          How to make
        </div>
        <div className="h-[2px] w-full opacity-20" />

        <div className="flex justify-start flex-wrap gap-4 w-full whitespace-pre-line">
          {recipe.instructions.length > 60 ? (
            <p className="w-full text-wrap grid whit">
              <span className="flex-wrap flex justify-start text-wrap items-center w-full">
                {recipe.instructions.slice(0, 60)} ...
              </span>{" "}
              <span className="text-sm text-blue-600 underline">read more</span>
            </p>
          ) : (
            recipe.instructions
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
