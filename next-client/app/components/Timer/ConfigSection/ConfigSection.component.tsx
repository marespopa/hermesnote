import React from "react";
import TimeSelector from "../../TimeSelector/TimeSelector";
import { TIMER_CONFIG } from "@/app/constants/timer";

type Props = {
  timer: number;
  handleTimeChange: (_v: string) => void;
};

const TimerConfigSection = ({ timer, handleTimeChange }: Props) => {
  return (
    <div
      className="mt-2 bg-gray-100 border border-gray-600 p-4
                 dark:bg-gray-700 dark:border-gray-600 dark:text-white
                 transition-all duration-150 ease-in-out w-full"
    >
      <div>
        <h3>
          Set timer for <span className="font-bold">{`${timer}m`}</span>
        </h3>
        <TimeSelector
          name="Timer"
          label={{
            min: `${TIMER_CONFIG.min}`,
            max: `${TIMER_CONFIG.max}`,
          }}
          value={timer}
          config={{
            min: TIMER_CONFIG.min,
            max: TIMER_CONFIG.max,
            step: TIMER_CONFIG.step,
          }}
          action={handleTimeChange}
        />
      </div>
    </div>
  );
};

export default TimerConfigSection;
