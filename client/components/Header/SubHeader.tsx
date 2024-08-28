"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { CiUser } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import { navData } from "@/data/nav.data";
import { closeSubNav, toggleSubNav } from "@/redux/features/slice/app.slice";
import { user } from "@/redux/features";
import { logoutUser } from "@/redux/features/slice/user.slice";
import { WrapItem, Avatar } from "@chakra-ui/react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

type Props = {};

const SubHeader = (props: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const nav_pathname = pathname.split("/")[1];
  const dispatch = useAppDispatch();
  const { openSubNav } = useAppSelector((state) => state.app);
  // const { user } = useAppSelector((state) => state.user);
  return (
    <div
      className={`p-4 bg-white border-b  text-black h-16 gap-4 flex justify-between w-full items-center px-6 lg:px-32`}
    >
      <div className="flex justify-start items-center gap-4">
        <WrapItem>
          <Avatar cursor={"pointer"} size="md" name={"default"} />
        </WrapItem>
      </div>
      <div className="flex justify-end items-center gap-1 ">
        <span
          className="p-2 md:hidden cursor-pointer"
          onClick={() => {
            dispatch(toggleSubNav());
          }}
        >
          {openSubNav ? (
            <IoMdClose fontSize={32} />
          ) : (
            <RxHamburgerMenu fontSize={32} />
          )}
        </span>
      </div>
    </div>
  );
};

export default SubHeader;
