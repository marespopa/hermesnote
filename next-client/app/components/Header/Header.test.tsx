import Header from "./Header.component";
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Header", () => {
  it("should render the component", () => {
    const { getByTestId } = render(<Header />);
    const element = getByTestId("GlobalHeader");

    expect(element).toBeInTheDocument();
  });
});
<Header />;
