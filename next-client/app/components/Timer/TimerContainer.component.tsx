import React, { useState } from "react";
import Button from "../Button";
import Timer from "./Timer.component";
import { FaRegWindowMaximize, FaRegWindowMinimize } from "react-icons/fa6";

type Props = {};

const TimerContainer = (props: Props) => {
  const [isTimerMinimized, setIsTimerMinimized] = useState(true);

  function toggleTimerWindow() {
    setIsTimerMinimized(!isTimerMinimized);
  }

  return (
    <section className={`${timerPopStyles}`}>
      <h2
        className="font-bold flex justify-between cursor-pointer"
        onClick={() => toggleTimerWindow()}
      >
        <span>Timer</span>
        <span>
          {isTimerMinimized ? <FaRegWindowMaximize /> : <FaRegWindowMinimize />}
        </span>
      </h2>
      {!isTimerMinimized && <Timer />}
    </section>
  );
};

const timerPopStyles = `bg-cyan-200 shadow-sm px-2 md:px-4 py-3 my-4 rounded-md
                        w-full sm:w-1/2 z-10 md:w-1/4 sm:fixed sm:right-4 sm:bottom-2
                        dark:bg-gray-800 dark:text-white dark:border-gray-600 sm:opacity-95`;

export default TimerContainer;
