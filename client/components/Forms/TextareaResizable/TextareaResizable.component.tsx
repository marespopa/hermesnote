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
      <label className="form-field">
        <span className="form-field__label">{label}</span>
        <textarea
          className="form-field__input"
          ref={textAreaRef}
          rows={4}
          aria-label={label}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};

export default TextareaResizable;
