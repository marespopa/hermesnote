"use client";

import React from "react";
import ThemeSwitcher from "./ThemeSwitcher/ThemeSwitcher";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header
      data-testid="GlobalHeader"
      className="bg-white sm:px-2 dark:bg-slate-900 text-gray-90 dark:text-white border-b-2 border-b-emerald-100 dark:border-b-slate-800 py-4 shadow-sm"
    >
      <div className="container max-w-screen-xl px-6 sm:px-4 md:px-2 mx-auto flex justify-between">
        <Navbar />
        <ThemeSwitcher />
      </div>
    </header>
  );
}
