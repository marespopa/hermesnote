"use client";

import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider } from "next-themes";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const CustomProviders = ({ children }: Props) => {
  return (
    <ThemeProvider attribute="class">
      <JotaiProvider>{children}</JotaiProvider>
    </ThemeProvider>
  );
};

export default CustomProviders;
