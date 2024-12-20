import { atom_searchTerm } from "@/app/atoms/atoms";
import useAutoResizeTextArea from "@/app/hooks/use-autoresize";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";

interface Props {
  name: string;
  value: string | undefined;
  placeholder?: string;
  handleChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}

const TextareaResizable = ({
  name,
  value = " ",
  placeholder,
  handleChange,
}: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutoResizeTextArea(textAreaRef, value);

  return (
    <div className="my-4">
      <textarea
        className="bg-gray-100 border-gray-200 border-2 prose prose-sm !max-w-none border-slate-100 dark:bg-slate-700 dark:border-slate-800 px-4 py-2 rounded-sm outline-none w-full"
        ref={textAreaRef}
        rows={4}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        spellCheck={true}
      />
    </div>
  );
};

export default TextareaResizable;
