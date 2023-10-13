import Button from "@/app/components/Button/Button.component";
import React from "react";

type Props = {
  description: string;
  title: string;
  action: {
    label: string;
    handler: () => void;
    disabled?: boolean;
  };
};

export default function InfoPanel({ description, title, action }: Props) {
  return (
    <div className="bg-sky-100 rounded-md py-8 px-6 dark:bg-slate-900">
      <h3 className="text-2xl text-center">{title}</h3>
      <p className="leading-relaxed mt-4">{description}</p>
      <div className="my-4 text-center">
        <Button
          label={action.label}
          handler={action.handler}
          variant="default"
          isDisabled={action.disabled}
        />
      </div>
    </div>
  );
}
