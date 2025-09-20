import { useState } from "react";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import type { PomodoroSettings, PomodoroStatus } from "./config";

import {
  DEFAULT_ROUNDS,
  DEFAULT_BREAK_TIME,
  DEFAULT_WORK_TIME,
  DEFAULT_IS_SETUP_SHOWN,
} from "./config";

function App() {
  // Settings state
  const [settings, setSettings] = useState<PomodoroSettings>({
    rounds: DEFAULT_ROUNDS,
    workTime: DEFAULT_WORK_TIME,
    breakTime: DEFAULT_BREAK_TIME,
  });

  // Status state
  const [status, setStatus] = useState<PomodoroStatus>({
    isSetupShown: DEFAULT_IS_SETUP_SHOWN,
    isRunning: false,
    isFinished: false,
    completedRounds: 0,
    workTimeRemaining: DEFAULT_WORK_TIME,
    breakTimeRemaining: DEFAULT_BREAK_TIME,
  });

  //MainController can have 2 different components
  //Setup View
  // Rounds
  // Work Time
  // Break Time
  // Done

  //Timer View
  //COG in top right of view to go back to SetupView
  //Start
  //Pause

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
