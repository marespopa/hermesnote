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

          <div className="my-2 prose dark:prose-invert">
            <h3>Start from scratch</h3>
            <p>
              Focus on your content, structure your document, and save or export
              it as either a Markdown or PDF file when you&apos;re ready.
            </p>
            <Button
              isDisabled={disabledButtonsState.new}
              variant="primary"
              handler={() => handleCreateFile()}
              label="New File"
            />
          </div>
          <div className="my-4 prose dark:prose-invert">
            <h3>Start from a template</h3>
            <p>
              Personalize it, insert your content, and save it as a Markdown
              file or export it as a PDF when you&apos;re ready.
            </p>
            <Button
              isDisabled={disabledButtonsState.template}
              variant="primary"
              handler={() => handleSelectTemplate()}
              label="Select a template"
            />
          </div>

          <div className="my-4 prose dark:prose-invert">
            <h3>Open a file</h3>
            <p>
              Personalize it, insert your content, and save it as a Markdown
              file or export it as a PDF when you&apos;re ready.
            </p>

            <FileInput
              name="file"
              placeholder="Upload a markdown file"
              fileList={fileList}
              handleChange={(filelist: FileList) => {
                console.dir(filelist);
                // @ts-ignore
                setFileList(filelist as File);

                return;
              }}
              label="Markdown File"
              accept=".md"
            />
            <Button
              variant="primary"
              label="Submit"
              handler={async () => {
                console.dir(fileList);

                if (fileList[0]) {
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
                      toast.success("File could not be loaded");
                      console.error(error);
                    })
                    .finally(() => {
                      setDisabledButtonsState({
                        ...disabledButtonsState,
                        existing: false,
                      });
                      setIsLoading(false);
                    });
                }
              }}
            ></Button>
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
    const [fileHandle] = await window.showOpenFilePicker(PICKER_OPTIONS);
    const file = await fileHandle.getFile();

    setDisabledButtonsState({ ...disabledButtonsState, existing: true });
    setIsLoading(true);

    parseFile(file)
      .then(() => {
        toast.success("File has been loaded");
        router.push("/dashboard/editor");
      })
      .catch((error) => {
        toast.success("File could not be loaded");
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
