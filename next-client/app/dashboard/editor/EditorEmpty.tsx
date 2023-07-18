"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import InfoPanel from "../components/InfoPanel";
import { useAtom } from "jotai";
import {
  atom_content,
  atom_contentEdited,
  atom_frontMatter,
} from "@/app/atoms/atoms";
import matter from "gray-matter";
import Loading from "@/app/components/Loading/Loading";
import DocumentationMessage from "../components/DocumentationMessage";

type StatusResponse = {
  status: "error" | "success";
  message: string;
};

export const PICKER_OPTIONS = {
  types: [
    {
      description: "MD Files",
      accept: {
        "text/markdown": [".md", ".txt"],
      },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false,
};

export default function EditorEmpty() {
  const router = useRouter();
  const [, setFrontMatter] = useAtom(atom_frontMatter);
  const [, setContent] = useAtom(atom_content);
  const [, setContentEdited] = useAtom(atom_contentEdited);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {renderHeading()}
      {!isLoading && renderActions()}
      {!isLoading && <DocumentationMessage />}
      {isLoading && (
        <Loading
          message={"Hang on tight. Your file is now being prepared..."}
        />
      )}
    </div>
  );

  function renderActions() {
    return (
      <section className="flex gap-8">
        <div className="flex-1 w-1/2">
          <InfoPanel
            title="Start from scratch"
            description={`Begin a new Markdown file in Hermes Notes. Focus on your content
                without distractions, format your document, and export it as a PDF
                when ready.`}
            action={{
              label: "New File",
              handler: () => handleCreateFile(),
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
              handler: () => handleOpenFile(),
            }}
          />
        </div>
      </section>
    );
  }

  function renderHeading() {
    return (
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
    );
  }

  function handleCreateFile() {
    setIsLoading(true);
    setFrontMatter({
      fileName: "file.md",
      title: "File",
      description: "",
      tags: "",
    });
    setContent("# Title");
    setContentEdited("# Title");
    router.push("/dashboard/editor");
  }

  async function handleOpenFile() {
    const [fileHandle] = await window.showOpenFilePicker(PICKER_OPTIONS);
    const file = await fileHandle.getFile();

    setIsLoading(true);
    parseFile(file)
      .then((data) => {
        console.info(data.message);
        router.push("/dashboard/editor");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }

  function parseFile(file: File): Promise<StatusResponse> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async () => {
        const result = await loadFileData(reader, file.name);
        resolve(result);
      };

      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  function loadFileData(reader: FileReader, fileName: string) {
    const fileContent = String(reader.result);
    const { data: frontMatter, content } = matter(fileContent);

    let setterPromise = new Promise<StatusResponse>(function (resolve, reject) {
      try {
        setFrontMatter({
          fileName: fileName || "",
          title: frontMatter?.title || "",
          description: frontMatter?.description || "",
          tags: frontMatter?.tags.join(","),
        });
        setContent(content);
        setContentEdited(content);

        resolve({
          status: "error",
          message: "File has been loaded successfully",
        });
      } catch (error) {
        reject({
          status: "error",
          message: error,
        });
      }
    });

    return setterPromise;
  }
}
