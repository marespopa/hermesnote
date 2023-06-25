import React from "react";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <main className="landing-page">
      <div className="container">
        <section className="hero">
          <div>
            <h1>Hermes Notes</h1>
            <h2>What is the app&apos;s purpose?</h2>
            <p>Easy track and manage markdown files.</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LandingPage;
