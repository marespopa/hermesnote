"use client";

import { useRouter } from "next/navigation";
import React from "react";
import InfoPanel from "./InfoPanel";

type Props = {};

export default function EmptyState({}: Props) {
  const router = useRouter();

  return (
    <div>
      <article className="my-16">
        <h2 className="text-2xl leading-tight">Choose Your Path:</h2>
        <h1 className="text-5xl leading-tight">
          Editing Options in Hermes Notes
        </h1>
        <p className="w-1/2 my-8 leading-loose">
          Discover the flexibility of Hermes Notes with two powerful options at
          your fingertips. Open Existing Markdown File and Start from Scratch
          offer effortless editing and creation experiences. Edit, save, export,
          and update frontmatter for existing files, or begin fresh with a clean
          slate.
        </p>
      </article>
      <section className="flex gap-8">
        <div className="flex-1 w-1/2">
          <InfoPanel
            title="Start from scratch"
            description={`Begin a new Markdown file in Hermes Notes. Focus on your content
                without distractions, format your document, and export it as a PDF
                when ready.`}
            action={{
              label: "New File",
              handler: () => router.push("/app/editor"),
              disabled: false,
            }}
          />
        </div>
        <div className="flex-1 w-1/2">
          <InfoPanel
            title="Import Existing Markdown File"
            description={`Access and edit your pre-existing Markdown files
                          within Hermes Notes. Update frontmatter, make changes,
                          and save or export the file as a PDF.`}
            action={{
              label: "Open File",
              handler: () => router.push("/app/editor"),
              disabled: true,
            }}
          />
        </div>
      </section>
    </div>
  );
}
