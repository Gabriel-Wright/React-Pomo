import { useState } from "react";
import {
  MAX_BREAK_MINUTES,
  MAX_ROUNDS,
  MAX_WORK_MINUTES,
  MIN_BREAK_MINUTES,
  MIN_ROUNDS,
  MIN_WORK_MINUTES,
  type PomodoroSettings,
  type PomodoroStatus,
} from "../config";
import { convertSecToMinString } from "../helpers";
import TickButton from "./Buttons/TickButton";
import SliderInput from "./Inputs/SliderInput";
import SettingsAlert from "./Alerts/SettingsAlert";

interface SetupViewProps {
  settings: PomodoroSettings;
  setSettings: React.Dispatch<React.SetStateAction<PomodoroSettings>>;
  setSetupShown: (value: boolean) => void;
  status: PomodoroStatus;
}
function SetupView({
  settings,
  setSettings,
  setSetupShown,
  status,
}: SetupViewProps) {
  const [showAlert, setShowAlert] = useState(
    status.hasStarted &&
      !status.isFinished &&
      !localStorage.getItem("skipSettingsAlert")
  );

  return (
    <div>
      {showAlert && (
        <SettingsAlert
          message="Changing settings now will affect future rounds of your current session"
          onDismiss={() => {
            setShowAlert(false);
          }}
        />
      )}
      <h1 className="countdown-header">Settings</h1>
      <div id="slider-input-list">
        <SliderInput
          label={"Rounds"}
          min={
            !status.isFinished
              ? Math.max(MIN_ROUNDS, status.currentRound)
              : MIN_ROUNDS
          }
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
