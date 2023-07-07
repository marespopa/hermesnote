import Textarea from "./Textarea.component";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const props: React.ComponentProps<typeof Textarea> = {
  name: "input",
  value: "",
  label: "Input",
  handleChange: jest.fn(),
  placeholder: "Input",
};

describe("Input", () => {
  it("renders", () => {
    const { getByRole } = render(<Textarea {...props} />);
    expect(getByRole("textbox", { name: props.label })).toBeInTheDocument();
  });

  it("has the correct placeholder shown", async () => {
    render(<Textarea {...props} />);
    const input = screen.getByRole("textbox", { name: props.label });
    expect(input).toHaveValue(props.placeholder);
  });
});
