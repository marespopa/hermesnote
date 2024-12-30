import { containerStyle } from "@/app/constants/styles";
import Editor from "./Editor";
import { Suspense } from "react";
import Loading from "@/app/components/Loading";

export default function EditorPage() {
  function SearchBarFallback() {
    return <Loading message="Getting things ready..." />;
  }

  return (
    <div className={`${containerStyle} !px-0 md:px-0`}>
      <Suspense fallback={<SearchBarFallback />}>
        <Editor />
      </Suspense>
    </div>
  );
}
