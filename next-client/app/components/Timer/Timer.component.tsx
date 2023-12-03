import { getFormattedTimeFromMs } from "@/app/services/date-utils";
import { FaRegWindowMaximize, FaRegWindowMinimize } from "react-icons/fa6";

import Button from "../Button";
import { useEffect, useState } from "react";
import { useDocumentTitle } from "@/app/hooks/use-document-title";

type Props = {
  isWorking: boolean;
  isResting: boolean;
  isTimerCounting: boolean;
  mainTime: number;
  startWorkInterval: () => void;
  startRestInterval: (long: boolean) => void;
  togglePauseFn: () => () => void;
  numberOfPomodoros: number;
  completedCycles: number;
};

const TimerComponent = ({
  isWorking,
  isResting,
  isTimerCounting,
  mainTime,
  startWorkInterval,
  startRestInterval,
  togglePauseFn,
  numberOfPomodoros,
  completedCycles,
}: Props) => {
  const [isTimerMinimized, setIsTimerMinimized] = useState(true);
  const isPauseButtonVisible = isWorking || isResting;
  const [_, setDocumentTitle] = useDocumentTitle("Hermes Notes");

  useEffect(() => {
    const title = getHeadingText(
      isWorking,
      isResting,
      isTimerCounting,
      mainTime
    );

    setDocumentTitle(title);
  }, [isResting, isTimerCounting, isWorking, mainTime, setDocumentTitle]);

  return (
    <section className={`${timerPopStyles}`}>
      <h2
        className="font-bold flex justify-between cursor-pointer"
        onClick={() => toggleTimerWindow()}
      >
        <span>
          {getHeadingText(isWorking, isResting, isTimerCounting, mainTime)}
        </span>
        <span>
          {isTimerMinimized ? <FaRegWindowMaximize /> : <FaRegWindowMinimize />}
        </span>
      </h2>
      {!isTimerMinimized && renderDetails()}
    </section>
  );

  function renderDetails() {
    return (
      <>
        <div className="flex gap-4 mt-4 justify-center">
          <Button
            label="WORK"
            handler={() => startWorkInterval()}
            variant="default"
          ></Button>
          <Button
            variant="default"
            label="REST"
            handler={() => startRestInterval(false)}
          ></Button>

          {isPauseButtonVisible && (
            <Button
              variant="default"
              label={isTimerCounting ? "PAUSE" : "GO"}
              handler={togglePauseFn()}
            ></Button>
          )}
        </div>

        <div className="mt-2">
          <p className="text-xs italic">
            One finished cycle consists in four finished pomodoros
          </p>
          <div className="mt-4 text-sm">
            <dl className="flex gap-4">
              <dt className="font-medium leading-6">Finished pomodoros:</dt>
              <dd className="font-bold leading-6">{numberOfPomodoros}</dd>

              <dt className="font-medium leading-6">Finished cycles</dt>
              <dd className="font-bold leading-6">{completedCycles}</dd>
            </dl>
          </div>
        </div>
      </>
    );
  }

  function toggleTimerWindow() {
    setIsTimerMinimized(!isTimerMinimized);
  }
};

function getHeadingText(
  isWorking: boolean,
  isResting: boolean,
  isTimerCounting: boolean,
  time: number // in Minutes
) {
  const formattedTime = getFormattedTimeFromMs(time * 1000);

  if (isTimerCounting) {
    return `${isWorking ? `Working` : `On a break`} - ${formattedTime} left`;
  }

  if (isWorking) {
    return "Working - Paused";
  }

  if (isResting) {
    return "On a break - Paused";
  }

  return "Pomodoro Timer";
}

const timerPopStyles = `bg-gray-300 shadow-sm px-2 md:px-4 py-3 my-4 rounded-md border border-gray-400
                        w-full sm:w-1/2 z-10 md:w-1/4 sm:fixed sm:right-4 sm:bottom-2
                        dark:bg-gray-600 dark:text-white dark:border-gray-700 sm:opacity-95`;

export default TimerComponent;
