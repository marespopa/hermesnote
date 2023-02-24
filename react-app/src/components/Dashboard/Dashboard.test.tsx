import { render } from "../../test-utils";
import Dashboard from "./Dashboard.component";

describe("Dashboard", () => {
  it("should render the Dashboard component", () => {
    const { getByTestId } = render(<Dashboard />);
    expect(getByTestId("Dashboard")).toBeInTheDocument();
  });
});
