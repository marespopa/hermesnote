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
            <h1>Hermes Notes</h1>
            <h2>Effortlessly Create, Edit, and Export Markdown Files</h2>

            <div>
              <Button
                variant="primary"
                label="Try it for Free"
                handleClick={() => navigateToDashboard()}
              />
              <Button
                variant="default"
                label="Learn More"
                handleClick={() => navigateToDashboard()}
              />
            </div>
          </div>

          <div className="hero__image-wrapper"></div>
        </section>
      </div>
      <div className="container">
        <section className="landing-page__section-wrapper">
          <div className="landing-page__section">
            <h3>Introduction</h3>
            <h2>Simplify Your Markdown Workflow with Hermes Notes</h2>
            <h4>The Ultimate Online Editor for Markdown Files</h4>
            <p>
              Hermes Notes is a powerful online editor that streamlines your
              Markdown workflow. From creating new Markdown files to editing
              existing ones, and seamless PDF exporting, Hermes Notes is your
              go-to tool for hassle-free Markdown editing.
            </p>
          </div>
        </section>

        <section className="landing-page__section-wrapper">
          <div className="landing-page__section">
            <h3>Why should I use this?</h3>
            <h2>Features</h2>
            <h4>Feature 1. Create New Markdown Files</h4>
            <p>
              Start fresh with a clean and intuitive interface to create new
              Markdown files effortlessly.
            </p>

            <h4>Feature 2: Frontmatter Support</h4>
            <p>
              Easily add frontmatter information, such as titles, authors, or
              tags, to your Markdown files for enhanced organization and
              metadata.
            </p>

            <h4>Feature 3: Edit Existing Markdown Files</h4>
            <p>
              Seamlessly edit your existing Markdown files, with the ability to
              preview changes in real-time.
            </p>

            <h4>Feature 4: PDF Exporting</h4>
            <p>
              Export your Markdown files as professional-looking PDF documents
              with a click of a button.
            </p>
          </div>
        </section>

        <section className="landing-page__section-wrapper">
          <div className="landing-page__section">
            <h3>Where can I use this?</h3>
            <h2>Use Cases</h2>
            <h4>Streamline Content Creation </h4>
            <p>
              Whether you&apos;re a writer, blogger, or content creator, Hermes
              Notes simplifies the creation and editing of Markdown files,
              allowing you to focus on your content.
            </p>

            <h4>Document Management</h4>
            <p>
              Keep your Markdown files organized and easily accessible. Edit
              existing files, add frontmatter details, and export them as PDFs
              for professional use.
            </p>
          </div>
        </section>

        <section className="landing-page__section-wrapper">
          <div className="landing-page__section">
            <h3>How much does it cost</h3>
            <h2>It&apos;s free. And it will always be.</h2>
          </div>
        </section>
      </div>
    </main>
  );

  function navigateToDashboard() {
    router.push("/dashboard");
  }
};

export default LandingPage;
