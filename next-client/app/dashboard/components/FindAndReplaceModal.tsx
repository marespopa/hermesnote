"use client";

import { atom_contentEdited, atom_searchTerm } from "@/app/atoms/atoms";
import DialogModal from "@/app/components/DialogModal";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import Checkbox from "@/app/components/Checkbox";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const FindAndReplaceModal = ({ isOpen, handleClose }: Props) => {
  const [searchTerm, setSearchTerm] = useAtom(atom_searchTerm);
  const [contentEdited, setContentEdited] = useAtom(atom_contentEdited);
  const [replaceTerm, setReplaceTerm] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [shouldReplaceAll, setShouldReplaceAll] = useState(false);
  const [isCaseSensitive, setIsCaseSensitive] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return <></>;
  }

  function handleReplace() {
    let text = contentEdited;
    let regexConfig = `${shouldReplaceAll ? "g" : ''}${isCaseSensitive ? "i": ''}`;
    const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedSearchTerm})`, regexConfig);

    text = text.replace(regex, replaceTerm);

    setContentEdited(text);
    handleClose();
  }

  return (
    <DialogModal isOpened={isOpen} onClose={handleClose} styles="max-w-2xl">
      <form className="mt-2 max-w-xl">
        <h3 className="text-2xl mt-1 flex gap-2 items-center justify-between">
          <span>Find and Replace</span>
        </h3>
        <Input
          label="Find"
          name="searchTerm"
          value={searchTerm}
          handleChange={(e) => setSearchTerm(e.currentTarget.value)}
        />
        <Input
          label="Replace With"
          name="replaceTerm"
          value={replaceTerm}
          handleChange={(e) => setReplaceTerm(e.currentTarget.value)}
        />
        <Checkbox
          label="Replace all"
          name="replaceAll"
          checked={shouldReplaceAll}
          handleChange={(e: React.FormEvent<HTMLInputElement>) => {
            setShouldReplaceAll(e.currentTarget.checked);
          }}
        />
        <Checkbox
          label="Case Sensitive"
          name="caseSensitive"
          checked={isCaseSensitive}
          handleChange={(e: React.FormEvent<HTMLInputElement>) => {
            setIsCaseSensitive(e.currentTarget.checked);
          }}
        />
        <div className="flex gap-2 items-center">
          <Button
            variant="default"
            handler={handleClose}
            label="Close"
          ></Button>
          <Button
            variant="primary"
            handler={handleReplace}
            label="Replace"
          ></Button>
        </div>
      </form>
    </DialogModal>
  );
};

export default FindAndReplaceModal;
