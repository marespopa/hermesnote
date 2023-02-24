import { render } from "../../test-utils";
import ExampleComponent from "./ExampleComponent";

describe("ExampleComponent", () => {
  it("should render the component", () => {
    const { getByTestId } = render(<ExampleComponent text={"test"} />);
    expect(getByTestId("ExampleComponent")).toBeInTheDocument();
  });
});
