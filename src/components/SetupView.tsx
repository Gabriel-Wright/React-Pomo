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
interface SetupViewProps {
  settings: PomodoroSettings;
  setSettings: React.Dispatch<React.SetStateAction<PomodoroSettings>>;
  setSetupShown: (value: boolean) => void; // only need this
}
function SetupView({ settings, setSettings, setSetupShown }: SetupViewProps) {
  const [roundInput, setRoundInput] = useState(String(settings.rounds));

  return (
    <div>
      <h1>Rounds: {settings.rounds}</h1>
      <input
        type="range"
        min={MIN_ROUNDS}
        max={MAX_ROUNDS}
        value={settings.rounds}
        onChange={(e) =>
          setSettings((prev) => ({
            ...prev,
            rounds: Number(e.target.value),
          }))
        }
      />
      <h1>WorkTime: {convertSecToMinString(settings.workTime)}</h1>
      <input
        type="range"
        min={MIN_WORK_MINUTES}
        max={MAX_WORK_MINUTES}
        value={settings.workTime / 60} // convert seconds → minutes for slider
        onChange={(e) =>
          setSettings((prev) => ({
            ...prev,
            workTime: Number(e.target.value) * 60, // convert minutes → seconds for state
          }))
        }
      />
      <h1>BreakTime: {convertSecToMinString(settings.breakTime)} </h1>
      <input
        type="range"
        min={MIN_BREAK_MINUTES}
        max={MAX_BREAK_MINUTES}
        value={settings.breakTime / 60} // convert seconds → minutes for slider
        onChange={(e) =>
          setSettings((prev) => ({
            ...prev,
            breakTime: Number(e.target.value) * 60, // convert minutes → seconds for state
          }))
        }
      />
      <button className="settings-button" onClick={() => setSetupShown(false)}>
        Back
      </button>
    </div>
  );
}

export default SetupView;
