import Input from "./Input.component";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const props: React.ComponentProps<typeof Input> = {
  name: "input",
  value: "",
  label: "Input",
  handleChange: jest.fn(),
  placeholder: "Input",
};

describe("Input", () => {
  it("renders", () => {
    const { getByRole } = render(<Input {...props} />);
    expect(getByRole("textbox", { name: props.label })).toBeInTheDocument();
  });

  it("has the correct placeholder shown", async () => {
    render(<Input {...props} />);
    const input = screen.getByRole("textbox", { name: props.label });
    expect(input).toHaveValue(props.placeholder);
  });
});
