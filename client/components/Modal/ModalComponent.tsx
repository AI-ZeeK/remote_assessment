"use client";
import React, { useEffect, useState } from "react";
import { Modal, ModalOverlay, useToast } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import AuthModal from "./Item/AuthModal";
import { closeModal } from "@/redux/features/slice/modal.slice";
import RecipeModal from "./Item/RecipeModal";
import DeleteModal from "./Item/DeleteModal";
import LogoutModal from "./Item/LogoutModal";
type Props = {};

const ModalComponent = (props: Props) => {
  const toast = useToast();
  const [clickOptions, setClickoptions] = useState(0);
  const { isOpen, component, data } = useAppSelector((state) => state.modal);
  // const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const ComponentItem: any = {
    AuthModal: <AuthModal />,
    LogoutModal: <LogoutModal />,
    RecipeModal: <RecipeModal data={data} />,
    DeleteModal: <DeleteModal data={data as string} />,
  }[component as string];

  useEffect(() => {
    if (clickOptions >= 4) {
      toast({
        title: "Sign in required",
        description: "cannot close modal without sign in",
        status: "loading",
        duration: 5000,
        isClosable: true,
      });
      setClickoptions(0);
    }
  }, [clickOptions]);

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={() => {
        // !user && setClickoptions((prev) => prev + 1);

        dispatch(closeModal());
      }}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      {component && ComponentItem}
    </Modal>
  );
};

export default ModalComponent;
