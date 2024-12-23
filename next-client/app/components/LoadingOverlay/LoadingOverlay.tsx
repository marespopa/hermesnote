import React from "react";

interface Props {
  isVisible: boolean;
  text?: string;
}

const LoadingOverlay = ({ isVisible, text = "Loading..." }: Props) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-amber-100 bg-opacity-80 flex items-center justify-center z-50">
      <div className="flex gap-2 justify-center items-center">
        <span className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-700" />
        <span className="text-md text-gray-700">{text}</span>
      </div>
    </div>
  );
};

export default LoadingOverlay;
