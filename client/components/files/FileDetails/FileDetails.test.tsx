import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FileDetails from "./FileDetails";

const props: React.ComponentProps<typeof FileDetails> = {
  content: "",
  frontMatter: {
    title: "Test",
  },
  fileName: "test",
};

describe("FileDetails", () => {
  it("renders", () => {
    const { getByTestId } = render(<FileDetails {...props} />);
    expect(getByTestId("FileDetails")).toBeInTheDocument();
  });
});
