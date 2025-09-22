import { useState, type ReactNode } from "react";
import SetupView from "./SetupView";
import CountdownView from "./CountdownView";
import type { PomodoroSettings, PomodoroStatus } from "../config";

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
    <div className="main-container">
      {status.isSetupShown ? (
        <SetupView
          settings={settings}
          setSettings={setSettings}
          setSetupShown={(value: boolean) =>
            setStatus((prev) => ({ ...prev, isSetupShown: value }))
          }
          status={status}
        />
      ) : (
        <CountdownView
          settings={settings}
          status={status}
          setStatus={setStatus}
        />
      )}
    </div>
  );
}

export default MainContainer;
