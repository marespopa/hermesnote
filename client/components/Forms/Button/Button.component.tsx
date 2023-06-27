type ButtonVariants = "primary" | "primary-large" | "default";

type Props = {
  variant?: ButtonVariants;
  label: string;
  handleClick: (e: React.FormEvent<HTMLButtonElement>) => void;
  style?: string;
  isDisabled?: boolean;
};

const Button = ({
  variant = "default",
  label,
  handleClick,
  isDisabled,
  style,
}: Props) => {
  return (
    <button
      className={`button button-${variant}${style || ""}`}
      disabled={isDisabled}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;
