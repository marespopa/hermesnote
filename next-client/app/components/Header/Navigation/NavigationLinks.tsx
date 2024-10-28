"use client";

import React from "react";
import NavigationLink from "./NavigationLink";
import { useAtom } from "jotai";
import { atom_content } from "@/app/atoms/atoms";

type Props = {};

export default function NavigationLinks({}: Props) {
  const [content] = useAtom(atom_content);
  const path =
    content && content.length > 0 ? "/dashboard/editor" : "dashboard";

  return (
    <nav className="ml-auto">
      <ul className="flex flex-col md:flex-row space-x-4 gap-8 items-center">
        <li>
          <NavigationLink label="Home" href="/" />
        </li>
        <li>
          <NavigationLink label="Learn Markdown" href="/documentation" />
        </li>
        <li>
          <NavigationLink label="Pricing" href="/pricing" />
        </li>
        <li>
          <NavigationLink label="App" href={path} isEmphasized={true} />
        </li>
      </ul>
    </nav>
  );
}
