"use client";

import { Provider as JotaiProvider } from "jotai";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const CustomProviders = ({ children }: Props) => {
  return (
    <JotaiProvider>
      {children}
    </JotaiProvider>
  );
};

export default CustomProviders;
