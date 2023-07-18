import React from "react";
import NavigationLink from "./NavigationLink";

type Props = {};

export default function NavigationLinks({}: Props) {
  return (
    <nav>
      <ul className="flex gap-8">
        <li>
          <NavigationLink label="Home" href="/" />
        </li>
        <li>
          <NavigationLink label="Documentation" href="/documentation" />
        </li>
        <li>
          <NavigationLink label="Pricing" href="/pricing" />
        </li>
        <li>
          <NavigationLink label="App" href="/dashboard" />
        </li>
      </ul>
    </nav>
  );
}
