"use client";
import React from "react";
import SubNav from "./SubNav";

import SubHeader from "./SubHeader";

type Props = {};

const Header = ({}: Props) => {
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
