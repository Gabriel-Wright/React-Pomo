import { useState } from "react";
import {
  MAX_BREAK_MINUTES,
  MAX_ROUNDS,
  MAX_WARMUP_MINUTES,
  MAX_WORK_MINUTES,
  MIN_BREAK_MINUTES,
  MIN_ROUNDS,
  MIN_WARMUP_MINUTES,
  MIN_WORK_MINUTES,
  type PomodoroSettings,
  type PomodoroStatus,
} from "../config";
import { convertSecToMinString } from "../helpers";
import TickButton from "./Buttons/TickButton";
import SliderInput from "./Inputs/SliderInput";
import SettingsAlert from "./Alerts/SettingsAlert";
import CheckBoxInput from "./Inputs/CheckBoxInput";
import XButton from "./Buttons/XButton";

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

  const [tempSettings, setTempSettings] = useState<PomodoroSettings>({
    ...settings,
  });
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
          value={tempSettings.rounds}
          onChange={(val) => {
            setTempSettings((prev) => ({ ...prev, rounds: val }));
          }}
        />
        <SliderInput
          label={"Work Time"}
          min={MIN_WORK_MINUTES}
          max={MAX_WORK_MINUTES}
          value={tempSettings.workTime / 60}
          displayValue={convertSecToMinString(tempSettings.workTime)}
          onChange={(val) =>
            setTempSettings((prev) => ({ ...prev, workTime: val * 60 }))
          }
        />
        <SliderInput
          label="Break Time"
          min={MIN_BREAK_MINUTES}
          max={MAX_BREAK_MINUTES}
          value={tempSettings.breakTime / 60}
          displayValue={convertSecToMinString(tempSettings.breakTime)}
          onChange={(val) =>
            setTempSettings((prev) => ({ ...prev, breakTime: val * 60 }))
          }
        />
        <CheckBoxInput
          label="Warmup Phase? "
          isChecked={tempSettings.warmupOn}
          onChange={(val) =>
            setTempSettings((prev) => ({ ...prev, warmupOn: val }))
          }
        />

        {tempSettings.warmupOn ? (
          <SliderInput
            label="Warmup Time"
            min={MIN_WARMUP_MINUTES}
            max={MAX_WARMUP_MINUTES}
            value={tempSettings.warmupTime / 60}
            displayValue={convertSecToMinString(tempSettings.warmupTime)}
            onChange={(val) =>
              setTempSettings((prev) => ({ ...prev, warmupTime: val * 60 }))
            }
          />
        ) : null}
      </div>
      <XButton
        id="x-settings-button"
        tooltip="Do not apply settings"
        onClick={() => {
          setSetupShown(false);
        }}
      />
      <TickButton
        id="settings-button"
        tooltip="Apply settings"
        onClick={() => {
          applyTempSettings(tempSettings, setSettings);
          setSetupShown(false);
        }}
      />
    </div>
  );
}

function applyTempSettings(
  tempSettings: PomodoroSettings,
  setSettings: React.Dispatch<React.SetStateAction<PomodoroSettings>>
) {
  setSettings(tempSettings);
}
export default SetupView;
