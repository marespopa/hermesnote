import { containerStyle } from "../constants/styles";
import DocumentationMessage from "./components/DocumentationMessage";
import EditorEmpty from "./editor/EditorEmpty";

export default function AppPage() {
  return (
    <div className={containerStyle}>
      <EditorEmpty />
      <DocumentationMessage />
    </div>
  );
}
