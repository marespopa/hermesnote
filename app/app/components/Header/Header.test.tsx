import Header from "./Header.component";
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Header", () => {
  it("Should render the Header", () => {
    const { getByTestId } = render(<Header />);
    const element = getByTestId("global-header");

    expect(element).toBeInTheDocument();
  });
});
<Header />;
