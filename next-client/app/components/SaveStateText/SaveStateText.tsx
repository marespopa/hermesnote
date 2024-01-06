import React from "react";

export type SaveState = "none" | "saving" | "saved";

type Props = {
  status: SaveState;
};

export default function SaveStateText({ status }: Props) {
  if (status === "saving") {
    return <span className="text-xs">⏳saving...</span>;
  }

  if (status === "saved") {
    return <span className="text-xs">✅changes are saved.</span>;
  }

  return <></>;
}
