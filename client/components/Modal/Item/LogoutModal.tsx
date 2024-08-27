/* eslint-disable react/no-unescaped-entities */
import SpinnerPage from "@/components/Spinner/Spinner";
import { closeModal } from "@/redux/features/slice/modal.slice";
import { logoutUser } from "@/redux/features/slice/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useDeleteRecipeMutation } from "@/redux/services/recipe.service";
import {
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { RiDeleteBin3Line } from "react-icons/ri";

const LogoutModal = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();

  return (
    <ModalContent className="flex flex-col">
      <ModalHeader className="uppercase"></ModalHeader>

      <ModalCloseButton />
      <div className="">
        <div className="w-full flex flex-col gap-4 justify-center items-center p-4">
          <div className="flex flex-col gap-4 justify-center items-center text-center">
            <IoIosLogOut fontSize={64} className="fill-green-500" />

            <h4 className="text-gray-800 text-lg font-semibold mt-4">
              Are you sure you want to sign out?
            </h4>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => {
                dispatch(logoutUser());
              }}
              type="button"
              className="px-4 py-2 rounded-lg text-white text-sm tracking-wide bg-green-500 hover:bg-green-600 active:bg-green-500"
            >
              Proceed
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
    </ModalContent>
  );
};

export default LogoutModal;
