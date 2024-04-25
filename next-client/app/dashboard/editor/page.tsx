import { containerStyle } from "@/app/constants/styles";
import Editor from "./Editor";

export default function EditorPage() {
  return (
    <div className={`${containerStyle} px-2 md:px-0`}>
      <Editor />
    </div>
  );
}
