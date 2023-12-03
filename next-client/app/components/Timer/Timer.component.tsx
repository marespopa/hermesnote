import { getFormattedTimeFromMs } from "@/app/services/date-utils";
import { useState, useEffect } from "react";
import Button from "../Button";

const DEFAULT_TIME = 25 * 60;

function Timer() {
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_TIME);
  const [timer, setTimer] = useState<NodeJS.Timer>();

  function handleStart() {
    const timer = setInterval(() => {
      setSecondsLeft((secondsLeft) => secondsLeft - 1);
      if (secondsLeft === 0) {
        clearInterval(timer);
      }
    }, 1000);
    setTimer(timer);
  }

  function handleReset() {
    setSecondsLeft(DEFAULT_TIME);
    clearInterval(timer);
  }

  useEffect(() => {
    if (secondsLeft === 0) {
      clearInterval(timer);
    }
  }, [secondsLeft, timer]);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  return (
    <section>
      <div className="flex gap-2 my-2">
        <Button variant="primary" handler={handleStart} label="Start" />
        <Button variant="primary" handler={handleReset} label="Reset" />
      </div>
      <div className="text-2xl font-semibold text-gray-700">
        {getFormattedTimeFromMs(secondsLeft * 1000)}
      </div>
    </section>
  );
}

export default Timer;
