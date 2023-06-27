import Image from "next/image";
import React from "react";
import Button from "../Forms/Button";
import { useRouter } from "next/router";

const LandingPage = () => {
  const HERO_IMAGE_URL = "/assets/hero-image.png";
  const router = useRouter();

  return (
    <main className="landing-page">
      <div className="hero__wrapper">
        <section className="hero">
          <div>
            <h1>
              Effortlessly <strong>Create, Edit, and Export</strong> Markdown
              Files
            </h1>
            <p>
              Hermes Notes understands the importance of effortless file
              management in your Markdown editing process.
            </p>
            <p className="hero__small-text">
              That&apos;s why we&apos;ve designed our app to provide a seamless
              experience when it comes to opening, saving, and exporting your
              Markdown files.
            </p>
            <div className="hero__cta">
              <Button
                variant="primary-large"
                label="Try it for Free"
                handleClick={() => navigateToDashboard()}
              />
            </div>
          </div>

          <div className="hero__image-wrapper"></div>
        </section>
      </div>
    </main>
  );

  function navigateToDashboard() {
    router.push("/dashboard");
  }
};

export default LandingPage;
