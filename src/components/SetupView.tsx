import { useState } from "react";
import {
  MAX_BREAK_MINUTES,
  MAX_ROUNDS,
  MAX_WORK_MINUTES,
  MIN_BREAK_MINUTES,
  MIN_ROUNDS,
  MIN_WORK_MINUTES,
  type PomodoroSettings,
} from "../config";
import { clamp, convertSecToMinString } from "../helpers";
import TickButton from "./Buttons/TickButton";
import SliderInput from "./Inputs/SliderInput";

interface SetupViewProps {
  settings: PomodoroSettings;
  setSettings: React.Dispatch<React.SetStateAction<PomodoroSettings>>;
  setSetupShown: (value: boolean) => void;
  currentRound: number;
}
function SetupView({
  settings,
  setSettings,
  setSetupShown,
  currentRound,
}: SetupViewProps) {
  const [roundInput, setRoundInput] = useState(String(settings.rounds));

  return (
    <div>
      <h1 className="countdown-header">Settings</h1>
      <div id="slider-input-list">
        <SliderInput
          label={"Rounds"}
          min={Math.max(MIN_ROUNDS, currentRound)}
          max={MAX_ROUNDS}
          value={settings.rounds}
          onChange={(val) => setSettings((prev) => ({ ...prev, rounds: val }))}
        />
        <SliderInput
          label={"Work Time"}
          min={MIN_WORK_MINUTES}
          max={MAX_WORK_MINUTES}
          value={settings.workTime / 60}
          displayValue={convertSecToMinString(settings.workTime)}
          onChange={(val) =>
            setSettings((prev) => ({ ...prev, workTime: val * 60 }))
          }
        />
        <SliderInput
          label="Break Time"
          min={MIN_BREAK_MINUTES}
          max={MAX_BREAK_MINUTES}
          value={settings.breakTime / 60}
          displayValue={convertSecToMinString(settings.breakTime)}
          onChange={(val) =>
            setSettings((prev) => ({ ...prev, breakTime: val * 60 }))
          }
        />{" "}
      </div>
      <TickButton onClick={() => setSetupShown(false)} />
    </div>
  );
}

export default SetupView;
