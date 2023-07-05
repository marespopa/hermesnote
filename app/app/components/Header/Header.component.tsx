"use client";

import React from "react";
import logoLight from "/assets/logo-l.svg";
import logoDark from "/assets/logo-d.svg";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import NavigationLink from "./Navigation/NavigationLink";
import ThemeSwitcher from "./ThemeSwitcher/ThemeSwitcher";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const logo = resolvedTheme === "dark" ? logoDark : logoLight;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header
      data-testid="GlobalHeader"
      className="bg-white dark:bg-slate-900 text-gray-90 dark:text-white border-b-2 border-b-gray-100 dark:border-b-slate-800 py-4"
    >
      <div className="container max-w-screen-xl mx-auto flex justify-between">
        <Link
          className="hover:scale-110 focus:scale-110 transition-transform ease-in"
          href={"/"}
        >
          <Image priority src={logo} alt="Hermes Notes" width={164} />
        </Link>

        <nav>
          <ul className="flex gap-8">
            <li>
              <NavigationLink label="Home" href="/" />
            </li>
            <li>
              <NavigationLink label="Docs" href="/documentation" />
            </li>
            <li>
              <NavigationLink label="Pricing" href="/pricing" />
            </li>
            <li>
              <NavigationLink label="Dashboard" href="/dashboard" />
            </li>
          </ul>
        </nav>

        <ThemeSwitcher />
      </div>
    </header>
  );
}
