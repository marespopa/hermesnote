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
  const [searchTerm] = useAtom(atom_searchTerm);
  useAutoResizeTextArea(textAreaRef, value);

  useEffect(() => {
    if (searchTerm && searchTerm.length > 0 && textAreaRef?.current) {
      const startIndex = value.toLowerCase().indexOf(searchTerm.toLowerCase());

      if (startIndex !== -1 && searchTerm) {
        // textAreaRef?.current?.focus();
        textAreaRef?.current?.setSelectionRange(
          startIndex,
          startIndex + searchTerm.length
        );
      }
    }
  }, [searchTerm, value]);

  return (
    <div className="my-4">
      <textarea
        className="bg-amber-50 border-2 prose prose-sm font-mono !max-w-none border-slate-100 dark:bg-slate-700 dark:border-slate-800 px-4 py-2 rounded-md outline-none w-full"
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
