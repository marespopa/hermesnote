interface Props {
  name: string;
  label: string;
  value: string | number | undefined;
  placeholder?: string;
  helperText?: string;
  handleChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({
  name,
  label,
  value,
  placeholder,
  helperText,
  handleChange,
}: Props) => {
  return (
    <div className="my-4">
      <label className="flex flex-col">
        <span className="text-gray-600 text-sm">{label}</span>
        <textarea
          className="bg-white px-2 py-2 rounded-sm border-2 border-gray-300  outline-none focus:border-emerald-800"
          rows={3}
          aria-label={label}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </label>
      {helperText && <p className="text-gray-500 text-xs">{helperText}</p>}
    </div>
  );
};

export default Textarea;
