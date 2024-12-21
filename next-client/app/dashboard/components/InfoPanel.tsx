import Button from "@/app/components/Button/Button.component";
import React, { JSX } from "react";

type Props = {
  description: string | JSX.Element;
  title: string | JSX.Element;
  action: {
    label: string;
    handler: () => void;
    disabled?: boolean;
  };
  isHighlighted?: boolean;
};

export default function InfoPanel({
  description,
  title,
  action,
  isHighlighted,
}: Props) {
  return (
    <div
      className={`bg-amber-100 rounded-sm py-8 px-6  hover:scale-105 focus:scale-105 ${
        isHighlighted ? "py-10 px-8" : ""
      }`}
    >
      <h3 className="text-2xl">{title}</h3>
      <p className="leading-relaxed mt-4">{description}</p>
      <div className="my-4 text-center">
        <Button
          label={action.label}
          handler={action.handler}
          variant="primary"
          isDisabled={action.disabled}
        />
      </div>
    </div>
  );
}
