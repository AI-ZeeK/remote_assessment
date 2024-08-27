import Link from "next/link";
import router from "next/router";
import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { CiLinkedin } from "react-icons/ci";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { navData } from "@/data/nav.data";

type Props = {};

const Aside = (props: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="h-screen w-[14rem] overflow-y-auto sticky top-0 border-r border border-purple-700 bg-indigo-400 hidden md:flex flex-col ">
      <div className="flex flex-col justify-start items-center relative h-full">
        <div className="flex flex-col w-full justify-center items-center h-full">
          {navData.map((navItem) => (
            <div key={navItem.id} className="w-full">
              <div
                onClick={() => router.push(navItem.link)}
                className={`text- text-sm p-4 uppercase py-6 cursor-pointer ${
                  pathname === navItem.link ? "bg-indigo-600 " : ""
                } tracking-wider text-white w-full hover:bg-indigo-500`}
              >
                {navItem.head}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Aside;
