interface Props {
  name: string;
  label: string;
  value: string | number | undefined;
  placeholder?: string;
  helperText?: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Input = ({
  name,
  label,
  value,
  placeholder,
  helperText,
  handleChange,
}: Props) => {
  return (
    <div className="form-group">
      <label className="form-field">
        <span className="form-field__label">{label}</span>
        <input
          className="form-field__input"
          type="text"
          aria-label={label}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </label>
      {helperText && (
        <p className="form-group__helper-text small">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
