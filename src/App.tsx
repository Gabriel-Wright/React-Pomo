import { useState } from "react";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import {
  DEFAULT_ROUNDS,
  DEFAULT_BREAK_TIME,
  DEFAULT_WORK_TIME,
} from "./config";

// Configurable values
interface PomodoroSettings {
  rounds: number;
  workTime: number;
  breakTime: number;
}

// Runtime values
interface PomodoroStatus {
  isSetupShown: boolean;
  isRunning: boolean;
  isFinished: boolean;
  completedRounds: number;
  workTimeRemaining: number;
  breakTimeRemaining: number;
}

function App() {
  // Settings state
  const [settings, setSettings] = useState<PomodoroSettings>({
    rounds: DEFAULT_ROUNDS,
    workTime: DEFAULT_WORK_TIME,
    breakTime: DEFAULT_BREAK_TIME,
  });

  // Status state
  const [status, setStatus] = useState<PomodoroStatus>({
    isSetupShown: true,
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
