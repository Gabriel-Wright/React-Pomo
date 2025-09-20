import type { PomodoroSettings } from "../config";

interface SetupViewProps {
  settings: PomodoroSettings;
  setSettings: React.Dispatch<React.SetStateAction<PomodoroSettings>>;
  setSetupShown: (value: boolean) => void; // only need this
}
function SetupView({ settings, setSettings, setSetupShown }: SetupViewProps) {
  return <h1>{settings.rounds}</h1>;
}

export default SetupView;
