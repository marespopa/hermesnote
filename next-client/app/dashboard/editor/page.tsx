import { containerStyle } from "@/app/constants/styles";
import Editor from "./Editor";
import Link from "next/link";
import DocumentationMessage from "../components/DocumentationMessage";

export default function EditorPage() {
  return (
    <div className={containerStyle}>
      <Editor />
      <DocumentationMessage />
    </div>
  );
}
