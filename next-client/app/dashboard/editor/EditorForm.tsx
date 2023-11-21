"use client";

import { atom_frontMatter, atom_hasChanges } from "@/app/atoms/atoms";
import DialogModal from "@/app/components/DialogModal";
import Input from "@/app/components/Input";
import Loading from "@/app/components/Loading/Loading";
import Textarea from "@/app/components/Textarea";
import { useAtom } from "jotai";
import { FormEvent, useEffect, useState } from "react";

interface Props {
  isOpened: boolean;
  handleClose: () => void;
}

export default function EditorForm({ isOpened, handleClose }: Props) {
  const [, setHasChanges] = useAtom(atom_hasChanges);
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
    setHasChanges(true);
  };

  if (!isMounted) {
    return <Loading message="The template is now being read..." />;
  }

  return (
    <DialogModal isOpened={isOpened} onClose={handleClose} styles="max-w-2xl">
      <form className="mt-8 max-w-xl">
        <h3 className="text-2xl mt-4">Document Properties</h3>
        <p className="mt-2">
          These fields, which will be saved as frontmatter, contain essential
          information about your Markdown file. Frontmatter is a section that
          sits at the beginning of your document, enclosed within triple dashes
          (---).
        </p>
        <Input
          label="File Name"
          name="fileName"
          value={frontMatterData.fileName}
          handleChange={(e) => handleChange(e, "fileName")}
          helperText="The extension .md will be automatically added when saving."
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
      </form>
    </DialogModal>
  );
}
