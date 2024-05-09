"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  atom_content,
  atom_contentEdited,
  atom_frontMatter,
} from "@/app/atoms/atoms";
import Loading from "@/app/components/Loading";
import matter from "gray-matter";
import toast from "react-hot-toast";
import InfoPanel from "../components/InfoPanel";
import DocumentationMessage from "../components/DocumentationMessage";
import TemplateSelectionModal from "../templates/TemplateSelectionModal";
import { StatusResponse } from "@/app/services/save-utils";
import { useWindowSize } from "@/app/hooks/use-mobile";
import Button from "@/app/components/Button";
import FileInput from "@/app/components/FileInput";

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
  const [isFileInputVisible, setIsFileInputVisible] = useState(false);
  const [isTemplateSelectModalVisible, setIsTemplateSelectModalVisible] =
    useState(false);
  const [disabledButtonsState, setDisabledButtonsState] = useState({
    existing: false,
    new: false,
    template: false,
  });
  const { width: windowWidth } = useWindowSize();
  const isBrowserMobile = !!windowWidth && windowWidth < 768;
  const [mounted, setMounted] = useState(false);
  const [fileList, setFileList] = useState<File[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isBrowserMobile) {
    return (
      <div>
        <article className="my-8">
          <h2 className="text-2xl leading-tight">Let&apos;s get started!</h2>

          <div className="my-2 prose dark:prose-invert flex flex-col gap-2">
            <Button
              isDisabled={disabledButtonsState.template}
              variant="default"
              handler={() => handleSelectTemplate()}
              label="Start from a template"
            />
            <Button
              isDisabled={disabledButtonsState.new}
              variant="default"
              handler={() => handleCreateFile()}
              label="Blank File"
            />

            <Button
              variant="default"
              label="Open File"
              isDisabled={disabledButtonsState.existing}
              handler={() => setIsFileInputVisible(!isFileInputVisible)}
            ></Button>

            {isFileInputVisible && (
              <div className="rounded-b-md flex flex-col -mt-2 gap-2 bg-slate-200 dark:bg-slate-900 p-2">
                <FileInput
                  name="file"
                  placeholder="Upload a markdown file"
                  fileList={fileList}
                  handleChange={(filelist: FileList) => {
                    // @ts-ignore
                    setFileList(filelist as File);

                    return;
                  }}
                  label="Markdown File"
                  accept=".md"
                  helperText="Load a markdown file."
                />
                <Button
                  variant="primary"
                  label="Load File"
                  isDisabled={disabledButtonsState.existing}
                  handler={() => {
                    console.log("here");
                    handleOpenFileFromInput();
                  }}
                ></Button>
              </div>
            )}
          </div>

          {isTemplateSelectModalVisible && (
            <TemplateSelectionModal
              isOpen={isTemplateSelectModalVisible}
              handleClose={() => {
                setDisabledButtonsState({
                  ...disabledButtonsState,
                  template: false,
                });
                setIsTemplateSelectModalVisible(false);
              }}
            ></TemplateSelectionModal>
          )}
        </article>
      </div>
    );
  }

  return (
    <div>
      {renderHeading()}
      {!isLoading && (
        <>
          {renderActions()}
          <DocumentationMessage />
        </>
      )}
      {isLoading && (
        <Loading
          message={"Hang on tight. Your file is now being prepared..."}
        />
      )}
    </div>
  );

  async function handleOpenFileFromInput() {
    console.log("file");

    if (!fileList || !fileList[0]) {
      console.log("here");
      toast.error("File could not be loaded");

      return;
    }

    try {
      setIsFileInputVisible(false);
      setDisabledButtonsState({
        ...disabledButtonsState,
        existing: true,
      });
      setIsLoading(true);

      const file = fileList[0];
      const text = await file.text();

      loadFileData(text, file.name)
        .then(() => {
          toast.success("File has been loaded");
          router.push("/dashboard/editor");
        })
        .catch((error) => {
          toast.error("File could not be loaded");
          console.error(error);
        })
        .finally(() => {
          setDisabledButtonsState({
            ...disabledButtonsState,
            existing: false,
          });
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }

  function renderActions() {
    return (
      <section className="flex gap-8">
        {renderSelectTemplateOption()}
        {renderNewFileOption()}
        {renderImportFileOption()}
      </section>
    );
  }

  function renderSelectTemplateOption() {
    return (
      <div className={panelStyle}>
        <InfoPanel
          title="Begin with a Markdown Template"
          description={`Personalize it, insert your content, and save it as a Markdown file or export it as a PDF when you're ready.`}
          action={{
            label: "Select a Template",
            handler: () => handleSelectTemplate(),
            disabled: disabledButtonsState.template,
          }}
        />

        {isTemplateSelectModalVisible && (
          <TemplateSelectionModal
            isOpen={isTemplateSelectModalVisible}
            handleClose={() => {
              setDisabledButtonsState({
                ...disabledButtonsState,
                template: false,
              });
              setIsTemplateSelectModalVisible(false);
            }}
          ></TemplateSelectionModal>
        )}
      </div>
    );
  }

  function renderNewFileOption() {
    return (
      <div className={panelStyle}>
        <InfoPanel
          title="Start from scratch"
          description={`Focus on your content, structure your document, and save or export it as either a Markdown or PDF file when you're ready.`}
          action={{
            label: "New File",
            handler: () => handleCreateFile(),
            disabled: disabledButtonsState.new,
          }}
        />
      </div>
    );
  }

  function renderImportFileOption() {
    return (
      <div className={panelStyle}>
        <InfoPanel
          title="Import Existing Markdown File"
          description={`Access and edit your existing Markdown files.
                          Update frontmatter, make changes, and choose to save or export the file in either Markdown or PDF format.`}
          action={{
            label: "Open File",
            handler: () => handleOpenFile(),
            disabled: disabledButtonsState.existing,
          }}
        />
      </div>
    );
  }

  function renderHeading() {
    return (
      <article className="my-16">
        <h2 className="text-2xl leading-tight">Choose Your Path:</h2>
        <h1 className="text-5xl leading-tight">
          Editing Options in Hermes Notes
        </h1>
        {!isLoading && (
          <p className="w-1/2 my-8 leading-loose">
            Explore the versatility of Hermes Notes through three
            straightforward options. Choose from a template, open an existing
            file, or start with a blank canvas. Effortlessly edit, save, export,
            and update both frontmatter and content for existing files, or begin
            fresh with a clean slate.
          </p>
        )}
      </article>
    );
  }

  function handleCreateFile() {
    setIsLoading(true);
    setFrontMatter({
      fileName: "file",
      title: "File",
      description: "",
      tags: "",
    });
    setContent("# Title");
    setContentEdited("# Title");
    setDisabledButtonsState({ ...disabledButtonsState, new: true });
    router.push("/dashboard/editor");
  }

  async function handleOpenFile() {
    setIsLoading(true);

    const [fileHandle] = await window.showOpenFilePicker(PICKER_OPTIONS);
    const file = await fileHandle.getFile();

    setDisabledButtonsState({ ...disabledButtonsState, existing: true });

    parseFile(file)
      .then(() => {
        toast.success("File has been loaded");
        router.push("/dashboard/editor");
      })
      .catch((error) => {
        toast.error("File could not be loaded");
        console.error(error);
      })
      .finally(() => {
        setDisabledButtonsState({ ...disabledButtonsState, existing: false });
        setIsLoading(false);
      });
  }

  function parseFile(file: File): Promise<StatusResponse> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async () => {
        const fileContent = String(reader.result);
        const result = await loadFileData(fileContent, file.name);
        resolve(result);
      };

      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  function loadFileData(fileContent: string, fileName: string) {
    const { data: frontMatter, content } = matter(fileContent);

    let setterPromise = loadFileInEditor(fileName, frontMatter, content);

    return setterPromise;
  }

  function loadFileInEditor(
    fileName: string,
    frontMatter: { [key: string]: any },
    content: string
  ) {
    return new Promise<StatusResponse>(function (resolve, reject) {
      try {
        setFrontMatter({
          fileName: fileName || "",
          title: frontMatter?.title || fileName || "Untitled File",
          description: frontMatter?.description || "",
          tags: frontMatter?.tags ? frontMatter?.tags.join(",") : "",
        });
        setContent(content);
        setContentEdited(content);

        resolve({
          status: "success",
          message: "File has been loaded successfully",
        });
      } catch (error) {
        reject({
          status: "error",
          message: error,
        });
      }
    });
  }

  function handleSelectTemplate() {
    setDisabledButtonsState({ ...disabledButtonsState, template: true });
    setIsTemplateSelectModalVisible(true);
  }
}

const panelStyle = "flex-1 w-1/3";
