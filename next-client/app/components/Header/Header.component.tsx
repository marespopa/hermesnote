"use client";

import React from "react";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header
      data-testid="GlobalHeader"
      className="bg-white sm:px-2 dark:bg-slate-900 text-gray-90 dark:text-white border-b-2 border-b-emerald-100 dark:border-b-slate-800 py-4 shadow-sm"
    >
      <Navbar />
    </header>
  );
}
