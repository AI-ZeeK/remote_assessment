"use client";
import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import SubNav from "./SubNav";
import Link from "next/link";
import { FcMenu } from "react-icons/fc";
import { toggleSubNav } from "@/redux/features/slice/app.slice";
import { Flex, WrapItem, Avatar, Box } from "@chakra-ui/react";
import { logoutUser } from "@/redux/features/slice/user.slice";
import { openComponentModal } from "@/redux/features/slice/modal.slice";
import SubHeader from "./SubHeader";

type Props = {};

const Header = ({}: Props) => {
  const dispatch = useAppDispatch();
  const subNavRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAppSelector((state) => state.user);
  // console.log("user:", user);
  // useEffect(() => {
  //   if (!user) {
  //     dispatch(
  //       openComponentModal({
  //         component: "AuthModal",
  //         data: "",
  //       })
  //     );
  //   }
  // });
  return (
    <nav className="flex flex-col w-full z-40 sticky top-0 ">
      <section className="z-40">
        <SubHeader />
      </section>
      <SubNav />
    </nav>
  );
};

export default Header;
