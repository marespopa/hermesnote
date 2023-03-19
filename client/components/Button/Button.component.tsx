type ButtonVariants = "primary" | "default";

type Props = {
  variant?: ButtonVariants;
  label: string;
  handleClick: (e: React.FormEvent<HTMLButtonElement>) => void;
  style?: string;
};

const Button = ({ variant = "default", label, handleClick, style }: Props) => {
  return (
    <button className={`button button-${variant}`} onClick={handleClick}>
      {label}
    </button>
  );
};

export default Button;
