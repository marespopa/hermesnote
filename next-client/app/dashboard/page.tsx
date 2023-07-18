"use client";

import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { containerStyle } from "../constants/styles";
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
