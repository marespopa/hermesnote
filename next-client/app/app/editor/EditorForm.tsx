"use client";

import { atom_frontMatter } from "@/app/atoms/atoms";
import Input from "@/app/components/Input";
import Textarea from "@/app/components/Textarea";
import { useAtom } from "jotai";
import { FormEvent, useEffect, useState } from "react";

export default function EditorForm() {
  const [frontMatterData, setFrontMatterData] = useAtom(atom_frontMatter);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const handleChange = (e: FormEvent<any>, field: string) => {
    const element = e.currentTarget as HTMLInputElement;
    const value = element.value;

    setFrontMatterData({
      ...frontMatterData,
      [field]: value,
    });
  };

  if (!isMounted) {
    return "Loading...";
  }

  return (
    <form className="flex gap-16 mt-8">
      <section className="flex-1">
        <h3 className="text-2xl mt-4">FrontMatter Info</h3>
        <Input
          label="File Name"
          name="fileName"
          value={frontMatterData.fileName}
          handleChange={(e) => handleChange(e, "fileName")}
        />
        <Input
          label="Title"
          name="title"
          value={frontMatterData.title}
          handleChange={(e) => handleChange(e, "title")}
        />
        <Textarea
          label="Description"
          name="description"
          value={frontMatterData.description}
          handleChange={(e) => handleChange(e, "description")}
        />
        <Input
          label="Tags"
          name="tags"
          value={frontMatterData.tags}
          handleChange={(e) => handleChange(e, "tags")}
          helperText="Separate tags by using comma ,"
        />
      </section>
      <section className="flex-1 p-4 bg-sky-200 dark:bg-slate-900 leading-relaxed rounded-md">
        <h2 className="text-2xl">What is FrontMatter?</h2>
        <p className="mt-2">
          Frontmatter is metadata that provides essential information about your
          Markdown file. It sits at the beginning of your document and is
          enclosed within triple dashes (---).
        </p>
        <p className="mt-2">
          Each field in the Frontmatter Form represents a specific piece of
          information:
        </p>
        <h4 className="font-bold text-xl mt-4">Filename</h4>
        <p className="mt-2">
          Enter a unique name for your Markdown file. This name helps you
          identify and organize your files within Hermes Notes.
        </p>
        <h4 className="font-bold text-xl mt-4">Title</h4>
        <p className="mt-2">
          Enter a unique name for your Markdown file. This name helps you
          identify and organize your files within Hermes Notes.
        </p>
        <h4 className="font-bold text-xl mt-4">Description</h4>
        <p className="mt-2">
          Write a concise summary or description of your Markdown file. This
          field allows you to provide a brief overview or introduction to your
          document.
        </p>
        <h4 className="font-bold text-xl mt-4">Tags</h4>
        <p className="mt-2">
          Add relevant tags or keywords to categorize your Markdown file. Tags
          help with organizing and searching for specific content within your
          collection of files.
        </p>
      </section>
    </form>
  );
}
