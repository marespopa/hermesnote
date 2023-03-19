import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProjectFileEditor from "./ProjectFileEditor";

const props: React.ComponentProps<typeof ProjectFileEditor> = {
  content: "",
  frontMatter: {
    title: "Test",
  },
  fileName: "test",
};

describe("Input", () => {
  it("renders", () => {
    const { getByTestId } = render(<ProjectFileEditor {...props} />);
    expect(getByTestId("ProjectFileEditor")).toBeInTheDocument();
  });
});
