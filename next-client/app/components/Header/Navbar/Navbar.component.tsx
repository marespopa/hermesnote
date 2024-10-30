"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import logo from "../../../../assets/logo.svg";
import NavigationLinks from "../Navigation/NavigationLinks";
import { useWindowSize } from "@/app/hooks/use-mobile";
import MobileNavigationLinks from "../Navigation/MobileNavigationLinks";
import { atom_content } from "@/app/atoms/atoms";
import { useAtom } from "jotai";

const Navbar = () => {
  // State to manage the navbar's visibility
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { width: windowWidth } = useWindowSize();
  const isBrowserMobile = !!windowWidth && windowWidth < 768;
  const [content] = useAtom(atom_content);
  const path =
    content && content.length > 0 ? "/dashboard/editor" : "dashboard";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Toggle function to handle the navbar's display
  const toggleNav = () => {
    setIsNavigationVisible(!isNavigationVisible);
  };

  return (
    <>
      <div className="flex items-center justify-between container max-w-screen-xl mx-auto px-4 sm:px-2">
        {/*Logo*/}
        <Link
          className="hover:scale-110 focus:scale-110 transition-transform ease-in"
          href={"/"}
        >
          <Image priority src={logo} alt="Hermes Markdown" width={200} />
        </Link>

        {/* Mobile Editor Link */}
        {isBrowserMobile && (
          <Link
            className={`text-white rounded-md transition ease-in-out p-2 bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-600 focus:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:bg-emerald-700`}
            href={path}
          >
            App
          </Link>
        )}

        {/*Menu Hamburg*/}
        <div className="md:hidden mr-4">
          <button onClick={toggleNav} className="dark:text-white">
            <FaBars />
          </button>
        </div>

        {/* Navigation links */}
        {!isBrowserMobile && <NavigationLinks />}
      </div>

      {/* Mobile Navigation links */}
      {isBrowserMobile && isNavigationVisible && (
        <MobileNavigationLinks handleClose={toggleNav} />
      )}
    </>
  );
};

export default Navbar;
