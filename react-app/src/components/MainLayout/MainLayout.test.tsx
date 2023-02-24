import { render } from "../../test-utils";
import MainLayout from "./MainLayout.component";

describe("Component", () => {
  it("Should match Component snapshot", () => {
    const { getByTestId } = render(
      <MainLayout>
        <div>Main</div>
      </MainLayout>
    );
    expect(getByTestId("MainLayout")).toBeInTheDocument();
  });
});
