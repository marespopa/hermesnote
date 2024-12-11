import React from "react";
import { FaHandRock } from "react-icons/fa";

interface Props {
  id: string;
}

const DragBar = ({ id }: Props) => {
  return (
    <div
      className={`${id} cursor-move w-full bg-emerald-200 dark:bg-emerald-800 py-2 px-4 text-center`}
    >
      <FaHandRock size={16} className="mx-auto" />
    </div>
  );
};

export default DragBar;
