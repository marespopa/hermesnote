import { render } from "../../test-utils";
import GlobalHeader from "./GlobalHeader";

describe("GlobalHeader", () => {
  it("should render the component", () => {
    const { getByTestId } = render(<GlobalHeader />);
    expect(getByTestId("GlobalHeader")).toBeInTheDocument();
  });
});
