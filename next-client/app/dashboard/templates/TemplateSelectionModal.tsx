"use client";

import {
  atom_frontMatter,
  atom_content,
  atom_contentEdited,
} from "@/app/atoms/atoms";
import DialogModal from "@/app/components/DialogModal";
import { useAtom } from "jotai";
import React, { FormEvent, useState } from "react";
import MarkdownTemplateList, { MarkdownTemplate } from ".";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";
import Input from "@/app/components/Input";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const TemplateSelectionModal = ({ isOpen, handleClose }: Props) => {
  const router = useRouter();
  const [, setFrontMatter] = useAtom(atom_frontMatter);
  const [, setContent] = useAtom(atom_content);
  const [, setContentEdited] = useAtom(atom_contentEdited);
  const [searchTerm, setSearchTerm] = useState("");
  const templates = MarkdownTemplateList;
  const filteredTemplates = templates.filter((template) => {
    const isTitleMatching = template.frontMatter.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const isTagMatching = template.frontMatter.tags
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return isTitleMatching || isTagMatching;
  });
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);

  return (
    <DialogModal isOpened={isOpen} onClose={handleClose}>
      <Input
        name="Search"
        value={searchTerm}
        label="Search"
        handleChange={(e: FormEvent<HTMLInputElement>) => {
          const element = e.currentTarget as HTMLInputElement;
          const value = element.value;

          setSearchTerm(value);
        }}
      />
      {isLoadingTemplate && <Loading />}
      {!isLoadingTemplate && renderTable()}
    </DialogModal>
  );

  function renderTable() {
    return (
      <table className="min-w-full text-left text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Tags</th>
            <th></th>
          </tr>
        </thead>
        {renderTableRows()}
      </table>
    );
  }

  function renderTableRows() {
    if (!filteredTemplates || !filteredTemplates.length) {
      return (
        <tbody>
          <td colSpan={4}>No template found</td>
        </tbody>
      );
    }

    return (
      <tbody className="overflow-y-auto">
        {filteredTemplates.map((template) =>
          renderTemplateAsTableRow(template)
        )}
      </tbody>
    );
  }

  function renderTemplateAsTableRow(template: MarkdownTemplate): any {
    const tags = template.frontMatter.tags?.split(",");

    return (
      <tr
        className="border-b dark:border-neutral-500"
        key={template.frontMatter.title}
      >
        <td>{template.frontMatter.title}</td>

        <td>{template.frontMatter.description}</td>

        <td>
          {tags.length && (
            <div className="flex flex-wrap gap-2 py-4">
              {tags.map((tag: string, index: number) => {
                return (
                  <span
                    key={index}
                    className="py-2 px-4 shadow-md no-underline rounded-full bg-blue-500 text-white text-xs"
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          )}
        </td>
        <td className="px-4">
          <Button
            label={"Select"}
            handler={() => loadFileFromTemplate(template)}
            variant="secondary"
            isDisabled={isLoadingTemplate}
          />
        </td>
      </tr>
    );
  }

  function loadFileFromTemplate(template: MarkdownTemplate) {
    setIsLoadingTemplate(true);
    setFrontMatter({
      fileName: template.filename || "",
      title: template.frontMatter?.title || "",
      description: template.frontMatter?.description || "",
      tags: template.frontMatter?.tags,
    });
    setContent(template.content);
    setContentEdited(template.content);

    router.push("/dashboard/editor");
  }
};

export default TemplateSelectionModal;
