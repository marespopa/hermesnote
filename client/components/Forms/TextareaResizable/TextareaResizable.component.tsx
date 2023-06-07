import useAutoResizeTextArea from "hooks/use-autoresize";
import { useRef } from "react";

interface Props {
  name: string;
  label: string;
  value: string | undefined;
  placeholder?: string;
  handleChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}

const TextareaResizable = ({
  name,
  label,
  value = " ",
  placeholder,
  handleChange,
}: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutoResizeTextArea(textAreaRef, value);

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <textarea
        ref={textAreaRef}
        rows={4}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextareaResizable;
