"use client";

import {
  atom_frontMatter,
  atom_content,
  atom_contentEdited,
} from "@/app/atoms/atoms";
import DialogModal from "@/app/components/DialogModal";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FileInput from "@/app/components/FileInput";
import toast from "react-hot-toast";
import {
  getFileDataFromInput,
  isSelectedFileValid,
} from "../editor/EditorUtils";
import Loading from "@/app/components/Loading";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const FileSelectionModal = ({ isOpen, handleClose }: Props) => {
  const router = useRouter();
  const [, setFrontMatter] = useAtom(atom_frontMatter);
  const [, setContent] = useAtom(atom_content);
  const [, setContentEdited] = useAtom(atom_contentEdited);
  const [isLoading, setIsLoading] = useState(false);
  const [fileList] = useState<File[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return <></>;
  }

  return (
    <DialogModal
      isOpened={isOpen}
      onClose={() => {
        handleClose();
      }}
    >
      <div className="p-2">
        {isLoading && <Loading />}
        <p className="my-4">Select a file to load in the editor:</p>
        <FileInput
          name="file"
          placeholder="Upload a markdown file"
          fileList={fileList}
          handleChange={(selectedFileList) =>
            handleOpenFileFromInput(selectedFileList)
          }
          label="Markdown File"
          accept=".md, .txt"
          helperText="Load a markdown file."
        />
      </div>
    </DialogModal>
  );

  async function handleOpenFileFromInput(fileList: FileList) {
    if (!fileList[0]) {
      toast.error(
        "Something went wrong with the file selection. Please try again."
      );

      return;
    }

    const file = fileList[0];

    if (!isSelectedFileValid(file)) {
      toast.error("The selected file must be a .md or a .txt file.");

      return;
    }

    setIsLoading(true);
    const fileData = await getFileDataFromInput(file);
    const fileName = fileData?.filename || "Untitled File";

    setFrontMatter({
      fileName: fileName,
      title: fileData?.frontMatter?.title || fileName,
      description: fileData?.frontMatter?.description || "",
      tags: fileData?.frontMatter?.tags
        ? fileData?.frontMatter?.tags.join(",")
        : "",
    });
    setContent(fileData?.content || "");
    setContentEdited(fileData?.content || "");

    router.push("/dashboard/editor");

    setTimeout(() => {
      handleClose();
    }, 2000); // Delay of 2 seconds

    return;
  }
};

export default FileSelectionModal;
