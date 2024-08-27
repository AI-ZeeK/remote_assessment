"use client";
import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  handleLoading?: () => void;
  onClick?: () => void;
  name: string;
  isLoading?: boolean;
  disabled?: boolean;
  outline?: boolean;
};

const Button = ({
  name,
  isLoading,
  disabled,
  outline,
  onClick = () => {},
}: Props) => {
  const router = useRouter();

  return (
    <button
      disabled={isLoading || disabled}
      onClick={onClick}
      className={`${
        outline
          ? "border-emerald-700 text-emerald-800 bg-white border"
          : "bg-emerald-700 text-white"
      } p-2 w-full flex h-10 justify-center items-center relative px-12 uppercase  text-sm font-semibold rounded-sm hover:bg-emerald-600  transition-all `}
    >
      {isLoading ? <Spinner /> : name}
    </button>
  );
};

export default Button;
