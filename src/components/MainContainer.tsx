import { useState, type ReactNode } from "react";
import SetupView from "./SetupView";
import CountdownView from "./CountdownView";
interface PomodoroSettings {
  rounds: number;
  workTime: number;
  breakTime: number;
}

interface PomodoroStatus {
  isSetupShown: boolean;
  isRunning: boolean;
  isFinished: boolean;
  completedRounds: number;
  workTimeRemaining: number;
  breakTimeRemaining: number;
}

interface MainContainerProps {
  settings: PomodoroSettings;
  setSettings: React.Dispatch<React.SetStateAction<PomodoroSettings>>;
  status: PomodoroStatus;
  setStatus: React.Dispatch<React.SetStateAction<PomodoroStatus>>;
}

function MainContainer({
  settings,
  setSettings,
  status,
  setStatus,
}: MainContainerProps) {
  return (
    <div>
      {status.isSetupShown ? (
        <SetupView
          settings={settings}
          setSettings={setSettings}
          setSetupShown={(value: boolean) =>
            setStatus((prev) => ({ ...prev, isSetupShown: value }))
          }
        />
      ) : (
        <CountdownView status={status} setStatus={setStatus} />
      )}
    </div>
  );
}

export default MainContainer;
