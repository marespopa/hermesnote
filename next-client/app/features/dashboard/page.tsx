"use client";

import Loading from "@/app/components/Loading";
import { containerStyle } from "@/app/constants/styles";
import { useState, useEffect } from "react";
import EditorEmpty from "./editor/EditorEmpty";

export default function AppPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={containerStyle}>
      <EditorEmpty />
    </div>
  );
}
