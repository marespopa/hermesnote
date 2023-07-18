"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import InfoPanel from "./InfoPanel";
import { useAtom } from "jotai";
import {
  atom_content,
  atom_contentEdited,
  atom_frontMatter,
} from "@/app/atoms/atoms";
import matter from "gray-matter";

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

export default function EmptyState() {
  const router = useRouter();
  const [, setFrontMatter] = useAtom(atom_frontMatter);
  const [, setContent] = useAtom(atom_content);
  const [, setContentEdited] = useAtom(atom_contentEdited);
  const [isLoading, setIsLoading] = useState(false);

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
      {!isLoading && (
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
      )}
      {isLoading && (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span>Your file is now being parsed...</span>
        </div>
      )}
    </div>
  );

  function handleCreateFile() {
    setFrontMatter({
      fileName: "file.md",
      title: "File",
      description: "",
      tags: "",
    });
    setContent("# Title");
    setContentEdited("# Title");
    router.push("/app/editor");
  }

  async function handleOpenFile() {
    const [fileHandle] = await window.showOpenFilePicker(PICKER_OPTIONS);
    const file = await fileHandle.getFile();

    setIsLoading(true);
    parseFile(file)
      .then(() => {
        console.info("File has been loaded.");
        router.push("/app/editor");
      })
      .catch((error) => {
        console.error("File could not be read");
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }

  function parseFile(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async () => {
        await loadFileData(reader, file.name);
        resolve(reader.result);
      };

      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  async function loadFileData(reader: FileReader, fileName: string) {
    const fileContent = String(reader.result);
    const { data: frontMatter, content } = matter(fileContent);

    let setterPromise = new Promise(function (resolve, reject) {
      try {
        setFrontMatter({
          fileName: fileName || "",
          title: frontMatter?.title || "",
          description: frontMatter?.description || "",
          tags: frontMatter?.tags.join(","),
        });
        setContent(content);
        setContentEdited(content);

        console.info("File has been read.");
        resolve("Data has been set");
      } catch (error) {
        console.error(error);
        reject("Data could not be set");
      }
    });

    return setterPromise;
  }
}
