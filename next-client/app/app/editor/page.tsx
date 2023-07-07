import { containerStyle } from "@/app/constants/styles";
import Editor from "./Editor";

export default function EditorPage() {
  return (
    <div className={containerStyle}>
      <Editor />
      <div className="my-16">
        <h3 className="text-sm max-w-1/2 text-center mx-auto">
          Want to learn more about how to write markdown. Access the
          documentation page.
        </h3>
      </div>
    </div>
  );
}
