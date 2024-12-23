"use client";
import { FormEvent, useRef, useState } from "react";
import DialogModal from "@/app/components/DialogModal";
import Button from "@/app/components/Button";
import { useAtom } from "jotai";
import { atom_showTimer, atom_timerSettings } from "@/app/atoms/atoms";
import Input from "../../Input";
import SaveStateText, { SaveState } from "../../SaveStateText/SaveStateText";
import { FaCog } from "react-icons/fa";
import Checkbox from "../../Checkbox";

type Timeout = ReturnType<typeof setTimeout> | null;

export default function TimerSettingsTrigger() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timer, setTimer] = useAtom(atom_timerSettings);
  const [saveState, setSaveState] = useState<SaveState>("none");
  const [showTimer, setShowTimer] = useAtom(atom_showTimer);
  const [showTimerSetting, setShowTimerSetting] = useState(showTimer);
  const savingTimeout = useRef<Timeout>(null);
  const savedTimeout = useRef<Timeout>(null);

  function handleClose() {
    setShowTimer(showTimerSetting);
    setIsModalOpen(false);
  }

  const handleChange = (e: FormEvent<any>, field: string) => {
    function finishSaving() {
      setTimer({
        ...timer,
        [field]: value,
      });
      savedTimeout.current = setTimeout(() => setSaveState("saved"), 800);
      savingTimeout.current = setTimeout(() => setSaveState("none"), 2800);
    }

    function startSaving() {
      if (savingTimeout.current) {
        clearTimeout(savingTimeout.current);
      }

      if (savedTimeout.current) {
        clearTimeout(savedTimeout.current);
      }

      setSaveState("saving");
    }

    const element = e.currentTarget as HTMLInputElement;
    const value = element.value;

    startSaving();
    finishSaving();
  };

  return (
    <>
      <div className="mt-4 flex justify-end absolute right-4 -bottom-4">
        <Button
          variant="secondary"
          handler={() => {
            setIsModalOpen(!isModalOpen);
          }}
          label={
            <>
              Settings <FaCog />
            </>
          }
        ></Button>
      </div>
      <DialogModal
        isOpened={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        styles="max-w-2xl"
      >
        <form className="mt-8 max-w-xl">
          <h3 className="text-2xl mt-4 flex gap-2 items-center justify-between">
            <span>Timer Properties</span>
            <SaveStateText status={saveState} />
          </h3>

          <p className="mt-2 my-4 text-sm text-gray-500">
            In here you can configure if you want to see the timer, and the
            default minutes for a work session or for break sessions.
          </p>

          <Input
            label="Pomodoro"
            name="workSession"
            type="number"
            validation={{
              min: 10,
              max: 120,
            }}
            value={timer.workSessionDurationInMin}
            handleChange={(e) => handleChange(e, "workSessionDurationInMin")}
            helperText="The duration of a work session."
          />
          <Input
            label="Short break"
            name="shortBreak"
            type="number"
            validation={{
              min: 5,
              max: 60,
            }}
            value={timer.shortBreakSessionDurationInMin}
            handleChange={(e) =>
              handleChange(e, "shortBreakSessionDurationInMin")
            }
            helperText="The duration of a short break session."
          />
          <Input
            label="Long break"
            name="longBreak"
            type="number"
            validation={{
              min: 10,
              max: 120,
            }}
            value={timer.longBreakSessionDurationInMin}
            handleChange={(e) =>
              handleChange(e, "longBreakSessionDurationInMin")
            }
            helperText="The duration of a long break session."
          />

          <Checkbox
            label="Show timer in the editor"
            name="showTimer"
            checked={showTimerSetting}
            helperText="You can re-add the timer by using the Edit menu."
            handleChange={(e: React.FormEvent<HTMLInputElement>) => {
              setShowTimerSetting(e.currentTarget.checked);
            }}
          />

          <Button
            variant="primary"
            handler={handleClose}
            label="Close"
          ></Button>
        </form>
      </DialogModal>
    </>
  );
}
