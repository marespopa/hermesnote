import { getFormattedTimeFromMs } from "@/app/services/date-utils";
import {
  FaGear,
  FaHourglassStart,
  FaMugHot,
  FaPause,
  FaPlay,
  FaRegWindowMaximize,
  FaRegWindowMinimize,
  FaTerminal,
} from "react-icons/fa6";

import Button from "../Button";
import { useEffect, useState } from "react";
import { useDocumentTitle } from "@/app/hooks/use-document-title";
import TimerSettingsTrigger from "./TimerSettingsTrigger";

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
      {!isTimerMinimized && <TimerSettingsTrigger />}
    </section>
  );

  function renderDetails() {
    return (
      <>
        <div>{renderControlButtons()}</div>

        <div className="mt-2 pb-8">
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

  function renderControlButtons() {
    return (
      <div className="flex gap-4 mt-4 justify-center">
        {!isResting && !isWorking && !isTimerCounting && (
          <Button
            label={
              <>
                START <FaPlay />
              </>
            }
            handler={() => startWorkInterval()}
            variant="small"
          ></Button>
        )}
        {isResting && (
          <Button
            label={
              <>
                WORK <FaTerminal />
              </>
            }
            handler={() => startWorkInterval()}
            variant="small"
          ></Button>
        )}
        {isWorking && (
          <Button
            variant="small"
            label={
              <>
                BREAK <FaMugHot />
              </>
            }
            handler={() => startRestInterval(false)}
          ></Button>
        )}
        {isPauseButtonVisible && (
          <Button
            variant="small"
            label={
              isTimerCounting ? (
                <>
                  PAUSE <FaPause />
                </>
              ) : (
                <>
                  GO <FaPlay />
                </>
              )
            }
            handler={togglePauseFn()}
          ></Button>
        )}
      </div>
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

const timerPopStyles = `bg-slate-200 shadow-sm py-2 md:px-4 pt-2 my-4 rounded-md
                        w-full sm:w-1/2 z-10 md:w-1/4 sm:fixed sm:right-4 sm:bottom-2
                        dark:bg-slate-600 dark:text-white opacity-95 relative`;

export default TimerComponent;
