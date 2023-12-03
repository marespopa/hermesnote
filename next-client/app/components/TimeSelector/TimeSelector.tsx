import React from "react";

type Props = {
  name: string;
  label: {
    min: string;
    max: string;
    title?: string;
  };
  value: number;
  config: {
    min: number;
    max: number;
    step: number;
  };
  action: (_arg: string) => void;
};

const TimeSelector = ({ name, label, value, config, action }: Props) => {
  return (
    <div className={`relative z-0 min-h-full`}>
      <div>
        {label?.title && <span className="text-strong">{label.title}</span>}
        <input
          id={name}
          name={name}
          type="range"
          min={config.min}
          max={config.max}
          value={value}
          step={config.step}
          placeholder={"Add time"}
          onChange={(e) => action(e.target.value)}
          className="w-full accent-gray-800 dark:accent-gray-600"
        />
        <div className="-mt-2 flex w-full justify-between">
          <span className="text-sm text-gray-400">{label.min}</span>
          <span className="text-sm text-gray-400">{label.max}</span>
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;
