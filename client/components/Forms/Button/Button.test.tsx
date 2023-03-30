import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button.component";

const props: React.ComponentProps<typeof Button> = {
  label: "Button",
  variant: "default",
  handleClick: jest.fn(),
};

describe("Button", () => {
  it("renders", () => {
    const { getByRole } = render(<Button {...props} />);
    expect(getByRole("button", { name: props.label })).toBeInTheDocument();
  });

  it("triggers the handleClick function", async () => {
    render(<Button {...props} />);
    const button = screen.getByRole("button", { name: props.label });
    await userEvent.click(button);
    expect(props.handleClick).toHaveBeenCalledTimes(1);
  });
});
