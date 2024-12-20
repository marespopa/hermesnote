import { InputHTMLAttributes, useEffect, useRef } from "react";
import * as React from "react";

interface Props {
  name: string;
  label: string;
  fileList: File[];
  accept: string;
  handleChange(fileList: FileList): void;
  placeholder?: string;
  helperText?: string;
}

const FileInput = ({
  name,
  label,
  fileList = [],
  handleChange,
  placeholder,
  helperText,
  accept,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const dataTransfer = new DataTransfer();
      Array.from(fileList).forEach((file) => dataTransfer.items.add(file));
      inputRef.current.files = dataTransfer.files;
    }
  }, [fileList]);

  return (
    <div className="my-4">
      <label className="flex flex-col">
        <span className="text-gray-600 dark:text-gray-200 text-sm">
          {label}
        </span>
        <input
          name={name}
          className="bg-white dark:bg-slate-700 px-2 py-2 rounded-sm border-2 border-gray-300 dark:border-gray-600 outline-none focus:border-emerald-800"
          type="file"
          ref={inputRef}
          data-testid="uploader"
          placeholder={placeholder}
          accept={accept}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) {
              return;
            }

            handleChange(e.target.files);
          }}
        />
      </label>
      {helperText && (
        <p className="text-gray-500 dark:text-gray-300 text-xs">{helperText}</p>
      )}
    </div>
  );
};

export default FileInput;
