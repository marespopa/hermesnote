"use client";

import React from "react";
import logoLight from "/assets/logo-l.svg";
import logoDark from "/assets/logo-d.svg";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeSwitcher from "./ThemeSwitcher/ThemeSwitcher";
import NavigationLinks from "./Navigation/NavigationLinks";
import { useIsDarkTheme } from "@/app/hooks/use-dark-theme";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const isDarkTheme = useIsDarkTheme();
  const logo = isDarkTheme ? logoDark : logoLight;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header
      data-testid="GlobalHeader"
      className="bg-white dark:bg-slate-900 text-gray-90 dark:text-white border-b-2 border-b-emerald-100 dark:border-b-slate-800 py-4"
    >
      <div className="container max-w-screen-xl mx-auto flex justify-between">
        <Link
          className="hover:scale-110 focus:scale-110 transition-transform ease-in"
          href={"/"}
        >
          <Image priority src={logo} alt="Hermes Notes" width={164} />
        </Link>
        <NavigationLinks />
        <ThemeSwitcher />
      </div>
    </header>
  );
}
