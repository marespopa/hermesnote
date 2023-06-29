import React from "react";

type Props = {};

export default function LandingPage({}: Props) {
  return (
    <main data-testid="landing-page" className="py-4">
      <article className="prose dark:prose-invert">
        <h1 className="text-5xl mt-8 leading-tight">
          Effortlessly Create, Edit, and Export Markdown Files
        </h1>
        <p className="text-lg">
          Hermes Notes understands the importance of effortless file management
          in your Markdown editing process.
        </p>
        <p className="text-md">
          That&apos;s why we&apos;ve designed our app to provide a seamless
          experience when it comes to opening, saving, and exporting your
          Markdown files.
        </p>
      </article>
    </main>
  );
}
