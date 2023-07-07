import useAutoResizeTextArea from "@/app/hooks/use-autoresize";
import { useRef } from "react";

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
        className="bg-white dark:bg-slate-700 px-4 py-2 rounded-md outline-none w-full"
        ref={textAreaRef}
        rows={4}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextareaResizable;
