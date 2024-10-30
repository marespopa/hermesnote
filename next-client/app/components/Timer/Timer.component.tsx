import { getFormattedTimeFromMs } from "@/app/services/date-utils";
import {
  FaMugHot,
  FaPause,
  FaPlay,
  FaRecycle,
  FaRegWindowMaximize,
  FaRegWindowMinimize,
  FaTerminal,
} from "react-icons/fa";

import Button from "../Button";
import { useEffect, useState } from "react";
import { useDocumentTitle } from "@/app/hooks/use-document-title";
import TimerSettingsTrigger from "./TimerSettingsTrigger";
import { useAtom } from "jotai";
import { atom_frontMatter } from "@/app/atoms/atoms";

type Props = {
  isWorking: boolean;
  isResting: boolean;
  isTimerCounting: boolean;
  mainTime: number;
  startWorkInterval: () => void;
  startRestInterval: (long: boolean) => void;
  resetPomodoro: () => void;
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
  resetPomodoro,
  togglePauseFn,
  numberOfPomodoros,
  completedCycles,
}: Props) => {
  const [isTimerMinimized, setIsTimerMinimized] = useState(true);
  const isPauseButtonVisible = isWorking || isResting;
  const [_, setDocumentTitle] = useDocumentTitle("Hermes Markdown");
  const [frontMatter] = useAtom(atom_frontMatter);
  const fileTitle = frontMatter.title || "File";

  useEffect(() => {
    const pomodoroSettings = {
      isWorking,
      isResting,
      isTimerCounting,
      time: mainTime,
    };

    const title = getHeadingText(pomodoroSettings, fileTitle, true);

    setDocumentTitle(title);
  }, [
    isResting,
    isTimerCounting,
    isWorking,
    mainTime,
    fileTitle,
    setDocumentTitle,
  ]);

  const pomodoroSettings = {
    isWorking,
    isResting,
    isTimerCounting,
    time: mainTime,
  };

  return (
    <section className={`${timerPopStyles}`}>
      <h2
        className="font-bold flex justify-between cursor-pointer"
        onClick={() => toggleTimerWindow()}
      >
        <span className="font-mono">
          {getHeadingText(pomodoroSettings, fileTitle, false)}
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
            variant="small--warning"
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
            variant={isTimerCounting ? "small" : "small--info"}
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
        {(isPauseButtonVisible || isTimerCounting) && (
          <Button
            variant="small--error"
            label={
              <>
                RESET <FaRecycle />
              </>
            }
            handler={() => resetPomodoro()}
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
  pomodoro: {
    isWorking: boolean;
    isResting: boolean;
    isTimerCounting: boolean;
    time: number; // in Minutes
  },
  fileTitle: string,
  isDocumentTitle: boolean
) {
  const { isWorking, isResting, isTimerCounting, time } = pomodoro;
  const formattedTime = getFormattedTimeFromMs(time * 1000);
  const usageBasedText = isDocumentTitle ? `/ ${fileTitle}` : "";

  if (isTimerCounting) {
    return `${formattedTime} - ${
      isWorking ? `Work` : `Break`
    } ${usageBasedText}`;
  }

  if (isWorking) {
    return `Work - Paused ${usageBasedText}`;
  }

  if (isResting) {
    return `Break - Paused ${usageBasedText}`;
  }

  return isDocumentTitle ? `${fileTitle}` : "Pomodoro Timer";
}

const timerPopStyles = `bg-slate-200 shadow-sm py-2 md:px-4 pt-2 my-4 rounded-md
                        w-full sm:w-1/2 z-10 md:w-1/4 sm:fixed sm:right-4 sm:bottom-2
                        dark:bg-slate-600 dark:text-white opacity-95 relative`;

export default TimerComponent;
