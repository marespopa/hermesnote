"use client";

import React from "react";
import ThemeSwitcher from "./ThemeSwitcher/ThemeSwitcher";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header
      data-testid="GlobalHeader"
      className="bg-white dark:bg-slate-900 text-gray-90 dark:text-white border-b-2 border-b-emerald-100 dark:border-b-slate-800 py-4 shadow-sm"
    >
      <div className="container p-4 sm:p-2 max-w-screen-xl mx-auto flex justify-between">
        <Navbar />
        <ThemeSwitcher />
      </div>
    </header>
  );
}
