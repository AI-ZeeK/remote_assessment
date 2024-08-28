/* eslint-disable react/no-unescaped-entities */
import SpinnerPage from "@/components/Spinner/Spinner";
import { setRerender } from "@/redux/features/slice/app.slice";
import { closeModal } from "@/redux/features/slice/modal.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useDeleteRecipeMutation } from "@/redux/services/recipe.service";
import {
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiDeleteBin3Line } from "react-icons/ri";

const DeleteModal = () => {
  const { data } = useAppSelector((state) => state.modal);
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [deleteRecipe, { isLoading, error, data: resData, isSuccess }] =
    useDeleteRecipeMutation();

  const handleDelete = async () => {
    await deleteRecipe(data);
    dispatch(closeModal());
  };
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Successfull",
        description: resData.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      dispatch(setRerender());
    }
    if (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: error?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, isSuccess]);

  return (
    <ModalContent className="flex flex-col">
      <ModalHeader className="uppercase"></ModalHeader>

      <ModalCloseButton />
      <div className="">
        <div className="w-full flex flex-col gap-4 justify-center items-center p-4">
          <div className="flex flex-col gap-4 justify-center items-center text-center">
            <RiDeleteBin3Line fontSize={64} className="fill-red-500" />

            <h4 className="text-gray-800 text-lg font-semibold mt-4">
              Are you sure you want to delete it?
            </h4>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={handleDelete}
              type="button"
              className="px-4 py-2 rounded-lg text-white text-sm tracking-wide bg-red-500 hover:bg-red-600 active:bg-red-500"
            >
              Delete
            </button>
            <button
              onClick={() => {
                dispatch(closeModal());
              }}
              type="button"
              className="px-4 py-2 rounded-lg text-gray-800 text-sm tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {isLoading && <SpinnerPage />}
    </ModalContent>
  );
};

export default DeleteModal;
