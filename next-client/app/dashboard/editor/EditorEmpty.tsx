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
import TemplateSelectionModal from "../templates/TemplateSelectionModal";
import { StatusResponse } from "@/app/services/save-utils";
import Button from "@/app/components/Button";
import FileInput from "@/app/components/FileInput";
import ShowWelcomeCheckbox from "../components/ShowWelcomeCheckbox";
import { FaFile, FaFileAlt, FaFolderOpen } from "react-icons/fa";
import Badge from "@/app/components/Badges/Badge";
import useIsMobile from "@/app/hooks/use-is-mobile";

export const PICKER_OPTIONS: OpenFilePickerOptions = {
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
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [fileList, _] = useState<File[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }

  if (isMobile) {
    return renderMobileView();
  }

  return (
    <div>
      {renderHeading()}
      {!isLoading && (
        <>
          {renderActions()}
          <ShowWelcomeCheckbox />
        </>
      )}
      {isLoading && (
        <Loading message={"Hang on tight. The editor is loading..."} />
      )}
    </div>
  );

  function renderMobileView() {
    return (
      <div>
        <article className="my-8">
          {/* Enhanced Header */}
          <h2 className="text-2xl leading-tight text-center mb-4">
            🚀 Let&apos;s get started!
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Choose an option below to begin working with Hermes Markdown.
          </p>

          {/* Buttons Section for Mobile View */}
          <div className="prose  flex flex-col gap-4">
            {/* Start from Template Button */}
            <div className="flex flex-col items-center">
              {/* Recommended Badge */}
              <Badge variant="success" label="Recommended" />
              <Button
                isDisabled={disabledButtonsState.template}
                variant="secondary"
                handler={() => handleSelectTemplate()}
                label={
                  <span>
                    <i className="fa fa-file-alt mr-2"></i> Start from a
                    Template
                  </span>
                }
              />
              <p className="text-xs text-center text-gray-500 mt-1">
                Use pre-built templates to save time and get started quickly.
              </p>
            </div>

            {/* Blank File Button */}
            <div className="flex flex-col items-center">
              <Button
                isDisabled={disabledButtonsState.new}
                variant="secondary"
                handler={() => handleCreateFile()}
                label={
                  <span>
                    <i className="fa fa-file mr-2"></i> Blank File
                  </span>
                }
              />
              <p className="text-xs text-center text-gray-500 mt-1">
                Start with a clean slate and create a new markdown file from
                scratch.
              </p>
            </div>

            {/* Open File Button */}
            <div className="flex flex-col items-center">
              <Button
                variant="secondary"
                label={
                  <span>
                    <i className="fa fa-folder-open mr-2"></i> Open File
                  </span>
                }
                isDisabled={disabledButtonsState.existing}
                handler={() => setIsFileInputVisible(!isFileInputVisible)}
              />
              <p className="text-xs text-center text-gray-500 mt-1">
                Import an existing markdown or text file to edit.
              </p>
            </div>

            {/* File Input Section (if visible) */}
            {isFileInputVisible && (
              <div className="rounded-b-md flex flex-col -mt-2 gap-2 bg-slate-200 p-2">
                <FileInput
                  name="file"
                  placeholder="Upload a markdown file"
                  fileList={fileList}
                  handleChange={(selectedFileList: FileList) => {
                    if (!selectedFileList) {
                      toast.error(
                        "Something went wrong with the file selection. Please try again."
                      );
                      return;
                    }

                    if (!isSelectedFileValid(selectedFileList[0])) {
                      toast.error(
                        "The selected file must be a .md or a .txt file."
                      );
                      return;
                    }

                    setIsFileInputVisible(false);
                    setDisabledButtonsState({
                      ...disabledButtonsState,
                      existing: true,
                    });
                    setIsLoading(true);
                    handleOpenFileFromInput(selectedFileList[0]);

                    return;
                  }}
                  label="Markdown File"
                  accept=".md, .txt"
                  helperText="Load a markdown file."
                />
              </div>
            )}
          </div>

          {/* Template Selection Modal */}
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
            />
          )}
        </article>
        <ShowWelcomeCheckbox />
      </div>
    );
  }

  function isSelectedFileValid(file: File) {
    return file && (file?.name.endsWith(".md") || file?.name.endsWith(".txt"));
  }

  async function handleOpenFileFromInput(file: File) {
    try {
      if (!file) {
        toast.error("File could not be loaded");

        return;
      }
      const text = await file.text();
      setIsLoading(true);
      loadFileData(text, file.name)
        .then(() => {
          router.push("/dashboard/editor");
          toast.success("File has been loaded");
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
        {renderNewFileOption()}
        {renderSelectTemplateOption()}
        {renderImportFileOption()}
      </section>
    );
  }

  function renderSelectTemplateOption() {
    return (
      <div className={panelStyle}>
        <InfoPanel
          isHighlighted={true}
          title={
            <span className="flex flex-col items-start">
              <Badge variant="success" label="Recommended" />
              <span className="flex gap-2 items-center">
                <FaFileAlt /> Start with a Template
              </span>
            </span>
          }
          description={`Pre-built structures for quick starts`}
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
          title={
            <span className="flex gap-2 items-center">
              <FaFile />
              Start from scratch
            </span>
          }
          description={`Begin with an empty document`}
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
          title={
            <span className="flex gap-2 items-center">
              <FaFolderOpen />
              Import existing file
            </span>
          }
          description={`Edit your existing markdown file`}
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
          Editing Options in Hermes Markdown
        </h1>
        {!isLoading && (
          <>
            <p className="w-1/2 my-8 leading-loose">
              Need a quick start? Choose a template and customize it to your
              liking. Want a blank canvas? Start from scratch and let your
              creativity flow. Or, perhaps you have an existing Markdown file
              ready to be polished? Simply open it and edit away.
            </p>
          </>
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
