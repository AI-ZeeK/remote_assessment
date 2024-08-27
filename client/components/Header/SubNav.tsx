"use client";
import { navData } from "@/data/nav.data";
import { useAppSelector } from "@/redux/hooks";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";

type Props = {};

const SubNav = (props: Props) => {
  const pathname = usePathname();
  const { openSubNav } = useAppSelector((state) => state.app);
  return (
    <nav
      className={`${
        openSubNav
          ? "translate-y-0 opacity-100"
          : "translate-y-[-100%] opacity-0"
      }  transition-all duration-300 border-b shadow-lg border-emerald-200 border-opacity-40 bg-primary-bg top-16 left-0 w-full z-20 absolute md:hidden bg-white`}
    >
      <ul className="justify-center items-start flex flex-col w-full">
        {navData.map((data) => (
          <Link
            key={data.id}
            href={data.link}
            className={`${
              `${pathname}` === data.link
                ? "bg-emerald-300 text-black"
                : "text-black"
            } cursor-pointer tracking-wider p-3 px-4 w-full transition-all hover:bg-emerald-200 hover:bg-opacity-40 text-sm`}
          >
            <span>{data.head}</span>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default SubNav;
