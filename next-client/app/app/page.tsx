import { containerStyle } from "../constants/styles";
import DocumentationMessage from "./components/DocumentationMessage";
import EmptyState from "./components/EmptyState";

export default function AppPage() {
  return (
    <div className={containerStyle}>
      <EmptyState />
      <DocumentationMessage />
    </div>
  );
}
