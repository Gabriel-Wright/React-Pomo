import { useState } from "react";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import type { PomodoroSettings, PomodoroStatus } from "./config";

import {
  DEFAULT_ROUNDS,
  DEFAULT_IS_SETUP_SHOWN,
  DEFAULT_WORK_TIME_MINUTES,
  DEFAULT_BREAK_TIME_MINUTES,
} from "./config";

function App() {
  // Settings state
  const [settings, setSettings] = useState<PomodoroSettings>({
    rounds: DEFAULT_ROUNDS,
    workTime: DEFAULT_WORK_TIME_MINUTES * 60,
    breakTime: DEFAULT_BREAK_TIME_MINUTES * 60,
  });

  // Status state
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

  return (
    <div>
      <Header />
      <MainContainer
        settings={settings}
        setSettings={setSettings}
        status={status}
        setStatus={setStatus}
      />
    </div>
  );
}

export default App;
