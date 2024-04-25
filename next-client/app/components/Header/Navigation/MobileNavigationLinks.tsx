"use client";

import React from "react";
import NavigationLink from "./NavigationLink";
import { useAtom } from "jotai";
import { atom_content } from "@/app/atoms/atoms";

type Props = {
  handleClose: () => void;
};

export default function MobileNavigationLinks({ handleClose }: Props) {
  const [content] = useAtom(atom_content);
  const path =
    content && content.length > 0 ? "/dashboard/editor" : "dashboard";

  return (
    <nav
      className={`w-full fixed top-16 left-0 bg-slate-300 dark:bg-slate-700 dark:text-white pt-2 pb-4 flex-grow`}
    >
      <ul className="flex flex-col md:flex-row space-x-4 gap-8 items-center">
        <li>
          <NavigationLink label="Home" href="/" action={handleClose} />
        </li>
        <li>
          <NavigationLink
            label="Learn Markdown"
            href="/documentation"
            action={handleClose}
          />
        </li>
        <li>
          <NavigationLink
            label="Pricing"
            href="/pricing"
            action={handleClose}
          />
        </li>
        <li>
          <NavigationLink
            label="App"
            href={path}
            isEmphasized={true}
            action={handleClose}
          />
        </li>
      </ul>
    </nav>
  );
}
