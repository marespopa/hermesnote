import React from "react";
import Button from "../Forms/Button";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  const router = useRouter();

  return (
    <main className="landing-page">
      <div className="hero__wrapper">
        <section className="hero">
          <div className="container">
            <h1>
              Effortlessly <strong>Create, Edit, and Export</strong> Markdown
              Files
            </h1>
            <p className="mt-lg">
              Hermes Notes understands the importance of effortless file
              management in your Markdown editing process.
            </p>
            <p className="hero__small-text mt-md">
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
      <section className="features__wrapper">
        <div className="container features">
          <article>
            <h2>Create and Edit .md Files</h2>
            <p className="mt-md">
              Start fresh with our intuitive editor, allowing you to create new
              Markdown files or edit existing ones with ease.
            </p>
          </article>
          <article>
            <h2>Use Frontmatter for Your File </h2>
            <p className="mt-md">
              Keep your files organized and enhance metadata by adding
              frontmatter information such as titles, authors, or tags.
            </p>
          </article>
          <article>
            <h2>Effortless PDF Exporting</h2>
            <p className="mt-md">
              Convert your Markdown files into stunning PDF documents in just a
              few clicks, preserving the formatting and structure of your
              content.
            </p>
          </article>
        </div>
      </section>
      <section className="motto__wrapper">
        <div className="motto container">
          <h2>
            Whether you&apos;re a writer, blogger, developer, or business
            professional, <strong>Hermes Notes</strong> is here to simplify your
            Markdown editing and PDF exporting needs.
          </h2>
          <Link className="motto__icon" href={"/dashboard"}>
            <Image
              src="/assets/icons/markdown-icon.png"
              height={62}
              width={100}
              alt="MD"
            />
          </Link>
        </div>
      </section>
    </main>
  );

  function navigateToDashboard() {
    router.push("/dashboard");
  }
};

export default LandingPage;
