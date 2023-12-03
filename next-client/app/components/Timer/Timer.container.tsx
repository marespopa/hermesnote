import { useInterval } from "@/app/hooks/use-interval";
import React, { useEffect, useState, useCallback } from "react";
import useSound from "use-sound";
import TimerComponent from "./Timer.component";

interface Props {
  pomodoroTime: number; // minutes
  shortRestTime: number; // minutes
  longRestTime: number; // minutes
  cycles: number;
}

export function TimerContainer({
  pomodoroTime,
  shortRestTime,
  longRestTime,
  cycles,
}: Props): JSX.Element {
  const [playSound_stop] = useSound("/resources/sounds/boop.mp3");
  const [playSound_start] = useSound("/resources/sounds/start-sound.mp3");

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
    togglePauseFn,
    numberOfPomodoros,
    completedCycles,
  };

  return <TimerComponent {...timerProps} />;

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
    return () => setIsTimerCounting(!isTimerCounting);
  }
}
