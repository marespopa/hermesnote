import React from "react";
import Features from "./subcomponents/Features";
import Hero from "./subcomponents/Hero";
import Motto from "./subcomponents/Motto";

export default function LandingPage() {
  return (
    <main data-testid="landing-page" className="py-4">
      <Hero />
      <Features />
      <Motto />
    </main>
  );
}
