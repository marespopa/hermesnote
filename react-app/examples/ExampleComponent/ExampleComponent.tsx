interface Props {
  text: string;
}

const ExampleComponent = ({ text }: Props) => {
  const baseDataTestId = "ExampleComponent";

  return (
    <div data-testid={baseDataTestId} className={componentStyle}>
      {text}
    </div>
  );
};

const componentStyle = `p-4`;

export default ExampleComponent;
