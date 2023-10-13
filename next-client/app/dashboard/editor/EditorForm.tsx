"use client";

import { atom_frontMatter } from "@/app/atoms/atoms";
import Input from "@/app/components/Input";
import Loading from "@/app/components/Loading/Loading";
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
    return <Loading message="The template is now being read..." />;
  }

  return (
    <form className="flex gap-16 mt-8">
      <section className="flex-1">
        <h3 className="text-2xl mt-4">Document Properties</h3>
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
        <h2 className="text-2xl">What is Document Properties?</h2>
        <p className="mt-2">
          These fields, which will be saved as frontmatter, contain essential
          information about your Markdown file. Frontmatter is a section that
          sits at the beginning of your document, enclosed within triple dashes
          (---).
        </p>
        <p className="mt-2">
          It typically includes metadata such as the document&apos;s title,
          description, tags, and other relevant details. Frontmatter helps
          organize and provide context to your Markdown content, making it more
          structured and informative.
        </p>
        <p className="mt-2">
          Each field in the Document Properties Form represents a specific piece
          of information:
        </p>
        <h4 className="font-bold text-xl mt-4">Filename</h4>
        <p className="mt-2">
          Enter a unique name for your Markdown file. This name will serve as
          the name of the exported MD/PDF file.
        </p>
        <h4 className="font-bold text-xl mt-4">Title</h4>
        <p className="mt-2">
          This field represents the title or name of your Markdown file as part
          of the frontmatter. It&apos;s used to provide a meaningful name for
          your document.
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
