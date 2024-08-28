/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef } from "react";
import { useAppDispatch } from "@/redux/hooks";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Baskervville } from "next/font/google";
import Header from "../Header/Header";
import { ChakraProvider } from "@chakra-ui/react";
import { closeSubNav } from "@/redux/features/slice/app.slice";
import ModalComponent from "../Modal/ModalComponent";
import Aside from "../Header/Aside";
import { Toaster } from "sonner";

type Props = {};
const baskervville = Baskervville({
  subsets: ["latin-ext"],
  weight: "400",
});

const Layout = ({
  children,
  modeKey,
}: Readonly<{
  children: React.ReactNode;
  modeKey: string;
}>) => {
  const headerRef: any = useRef(null);
  const bodyRef: any = useRef(null);
  const pathname = usePathname();

  const dispatch = useAppDispatch();

  const handleClickOutside = (event: any) => {
    if (
      headerRef.current &&
      !headerRef.current.contains(event.target) &&
      bodyRef.current.contains(event.target)
    ) {
      dispatch(closeSubNav());
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    dispatch(closeSubNav());
  }, [dispatch, pathname]);

  return (
    <ChakraProvider
      toastOptions={{ defaultOptions: { position: "top-right" } }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={modeKey}
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -25 }}
          transition={{ delay: 0.25, ease: "easeOut", duration: 0.25 }}
        >
          <section ref={bodyRef}>
            <main className={`min-h-screen relative top-0  flex w-full`}>
              <Aside />
              <main className="flex flex-col w-full relative">
                <header className="sticky top-0 z-40 " ref={headerRef}>
                  <Header />
                </header>

                <main className="z-10 overflow-x-hidden">{children}</main>

                <footer></footer>
              </main>
            </main>
          </section>
          <ModalComponent />
        </motion.div>
        <Toaster position="top-right" />
      </AnimatePresence>
    </ChakraProvider>
  );
};

export default Layout;
