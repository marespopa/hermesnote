"use client";

import { useState, useEffect } from "react";

import Loading from "@/app/components/Loading";
import { containerStyle } from "@/app/constants/styles";
import EditorEmpty from "./editor/EditorEmpty";
import { useAtom } from "jotai";
import { atom_showDashboard } from "../atoms/atoms";
import { useRouter } from "next/navigation";

export default function AppPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showDashboardOnStartup] = useAtom(atom_showDashboard);
  const router = useRouter();

  useEffect(() => {
    if (!showDashboardOnStartup) {
      router.push("dashboard/editor");
    }

    setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
