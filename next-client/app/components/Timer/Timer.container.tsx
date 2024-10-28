import { useInterval } from "@/app/hooks/use-interval";
import React, { useEffect, useState, useCallback, type JSX } from "react";
import useSound from "use-sound";
import TimerComponent from "./Timer.component";

interface Props {
  settings: {
    workSessionDurationInMin: number; // minutes
    shortBreakSessionDurationInMin: number; // minutes
    longBreakSessionDurationInMin: number; // minutes
  };
}

export function TimerContainer({ settings }: Props): JSX.Element {
  const [playSound_stop] = useSound("/resources/sounds/notification.mp3");
  const [playSound_pause] = useSound("/resources/sounds/boop.mp3");
  const [playSound_start] = useSound("/resources/sounds/start-tick.wav");
  const [playSound_reset] = useSound("/resources/sounds/reset.wav");

  const pomodoroTime = settings.workSessionDurationInMin * 60;
  const shortRestTime = settings.shortBreakSessionDurationInMin * 60;
  const longRestTime = settings.longBreakSessionDurationInMin * 60;
  const cycles = 4;

  const [mainTime, setMainTime] = useState(pomodoroTime);
  const [isTimerCounting, setIsTimerCounting] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [cyclesStateManager, setCyclesStateManager] = useState(
    new Array(cycles - 1).fill(true)
  );

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (isWorking) {
        setFullWorkingTime(fullWorkingTime + 1);
      }
    },
    isTimerCounting ? 1000 : null
  );

  const resetPomodoro = useCallback(resetPomodoroFn, [
    setIsTimerCounting,
    setIsWorking,
    setIsResting,
    setMainTime,
    pomodoroTime,
    playSound_reset,
  ]);

  const startWorkInterval = useCallback(startWorkIntervalFn, [
    setIsTimerCounting,
    setIsWorking,
    setIsResting,
    setMainTime,
    pomodoroTime,
    playSound_start,
  ]);

  const startRestInterval = useCallback(startRestIntervalFn, [
    setIsTimerCounting,
    setIsWorking,
    setIsResting,
    setMainTime,
    longRestTime,
    shortRestTime,
    playSound_stop,
  ]);

  useEffect(() => {
    if (mainTime > 0) return;

    if (isWorking && cyclesStateManager.length > 0) {
      startRestInterval(false);
      cyclesStateManager.pop();
    } else if (isWorking && cyclesStateManager.length <= 0) {
      startRestInterval(true);
      setCyclesStateManager(new Array(cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (isWorking) {
      setNumberOfPomodoros(numberOfPomodoros + 1);
    }

    if (isResting) {
      startWorkInterval();
    }
  }, [
    isWorking,
    isResting,
    mainTime,
    cyclesStateManager,
    numberOfPomodoros,
    completedCycles,
    startRestInterval,
    setCyclesStateManager,
    startWorkInterval,
    cycles,
  ]);

  const timerProps = {
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
  };

  return <TimerComponent {...timerProps} />;

  function resetPomodoroFn() {
    setIsTimerCounting(false);
    setIsWorking(false);
    setIsResting(false);
    setCompletedCycles(0);
    setCyclesStateManager([]);
    setNumberOfPomodoros(0);
    setMainTime(pomodoroTime);
    playSound_reset();
  }

  function startWorkIntervalFn() {
    setIsTimerCounting(true);
    setIsWorking(true);
    setIsResting(false);
    setMainTime(pomodoroTime);
    playSound_start();
  }

  function startRestIntervalFn(long: boolean) {
    setIsTimerCounting(true);
    setIsWorking(false);
    setIsResting(true);
    setMainTime(long ? longRestTime : shortRestTime);
    playSound_stop();
  }

  function togglePauseFn(): () => void {
    return () => {
      setIsTimerCounting(!isTimerCounting);
      isTimerCounting ? playSound_pause() : playSound_start();
    };
  }
}
