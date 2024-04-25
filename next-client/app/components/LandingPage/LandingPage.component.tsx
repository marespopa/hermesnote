import React from "react";
import Features from "./subcomponents/Features";
import Hero from "./subcomponents/Hero";
import Motto from "./subcomponents/Motto";

export default function LandingPage() {
  return (
    <main
      data-testid="LandingPage"
      className="p-4 md:px-2 bg-white dark:bg-slate-800"
    >
      <Hero />
      <Features />
      <Motto />
    </main>
  );
}
