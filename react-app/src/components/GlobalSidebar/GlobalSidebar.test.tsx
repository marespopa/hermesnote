import { render } from "../../test-utils";
import GlobalSidebar from "./GlobalSidebar.component";

describe("GlobalSidebar", () => {
  it("should render the component", () => {
    const { getByTestId } = render(<GlobalSidebar />);
    expect(getByTestId("GlobalSidebar")).toBeInTheDocument();
  });
});
