"use client";

import React from "react";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header
      data-testid="GlobalHeader"
      className="bg-amber-100 sm:px-2  text-gray-90   py-4 shadow-sm"
    >
      <Navbar />
    </header>
  );
}
