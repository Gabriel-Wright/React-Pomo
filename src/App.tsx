import { useEffect, useState } from "react";
import MainContainer from "./components/MainContainer";
import type { PomodoroSettings, PomodoroStatus } from "./config";

import {
  DEFAULT_ROUNDS,
  DEFAULT_IS_SETUP_SHOWN,
  DEFAULT_WORK_TIME_MINUTES,
  DEFAULT_BREAK_TIME_MINUTES,
  DEFAULT_WARMUP_TIME_MINUTES,
} from "./config";
import GithubButton from "./components/Buttons/GithubButton";
import { convertNumToTimeString } from "./helpers";
import Header from "./components/Header/Header";
import { changeTheme } from "./themes";

function App() {
  // Settings state
  const [settings, setSettings] = useState<PomodoroSettings>({
    rounds: DEFAULT_ROUNDS,
    workTime: DEFAULT_WORK_TIME_MINUTES * 60,
    breakTime: DEFAULT_BREAK_TIME_MINUTES * 60,
    warmupOn: false,
    warmupTime: DEFAULT_WARMUP_TIME_MINUTES * 60,
    theme: 1,
  });

  // Default Status state
  const [status, setStatus] = useState<PomodoroStatus>({
    isSetupShown: DEFAULT_IS_SETUP_SHOWN,
    isRunning: false,
    hasStarted: false,
    isFinished: false,
    currentRound: 1,
    currentPhase: {
      name: "work",
      timeRemaining: DEFAULT_WORK_TIME_MINUTES * 60,
    },
  });

  useEffect(() => {
    const root = document.documentElement;
    changeTheme(settings.theme, root);
  }, [settings.theme]);

  const appClass = `app-wrapper ${status.currentPhase.name}-phase`;

  useEffect(() => {
    document.title = `${status.currentPhase.name.toUpperCase()} – ${convertNumToTimeString(
      status.currentPhase.timeRemaining
    )}`;
  }, [status.currentPhase]);

  return (
    <div className={`app-wrapper ${appClass}`}>
      <Header settings={settings} setSettings={setSettings} />
      <MainContainer
        settings={settings}
        setSettings={setSettings}
        status={status}
        setStatus={setStatus}
      />
      {status.isSetupShown ? null : <GithubButton id="github-link" />}
    </div>
  );
}

export default App;
