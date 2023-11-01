import React from "react";
import NavigationLink from "./NavigationLink";

type Props = {};

export default function NavigationLinks({}: Props) {
  return (
    <nav>
      <ul className="flex gap-8 items-center">
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
          <NavigationLink label="App" href="/dashboard" isEmphasized={true} />
        </li>
      </ul>
    </nav>
  );
}
