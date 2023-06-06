interface Props {
  name: string;
  label: string;
  value: string | number | undefined;
  placeholder?: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Input = ({ name, label, value, placeholder, handleChange }: Props) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        aria-label={label}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
