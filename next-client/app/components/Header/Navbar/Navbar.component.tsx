"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import logoLight from "/assets/logo-l.svg";
import logoDark from "/assets/logo-d.svg";
import { useIsDarkTheme } from "@/app/hooks/use-dark-theme";
import NavigationLinks from "../Navigation/NavigationLinks";
import { useWindowSize } from "@/app/hooks/use-mobile";
import MobileNavigationLinks from "../Navigation/MobileNavigationLinks";
import NavigationLink from "../Navigation/NavigationLink";
import { atom_content } from "@/app/atoms/atoms";
import { useAtom } from "jotai";

const Navbar = () => {
  // State to manage the navbar's visibility
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isDarkTheme = useIsDarkTheme();
  const logo = isDarkTheme ? logoDark : logoLight;
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
      <div className="flex justify-between w-full items-center">
        {/*Logo*/}
        <Link
          className="hover:scale-110 focus:scale-110 transition-transform ease-in"
          href={"/"}
        >
          <Image priority src={logo} alt="Hermes Notes" width={164} />
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
