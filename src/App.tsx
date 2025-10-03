import { useEffect, useState } from "react";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import type { Phase, PomodoroSettings, PomodoroStatus } from "./config";

import {
  DEFAULT_ROUNDS,
  DEFAULT_IS_SETUP_SHOWN,
  DEFAULT_WORK_TIME_MINUTES,
  DEFAULT_BREAK_TIME_MINUTES,
  DEFAULT_WARMUP_TIME_MINUTES,
} from "./config";
import GithubButton from "./components/Buttons/GithubButton";
import { convertNumToTimeString } from "./helpers/helpers";
import { buildPhaseQueue } from "./helpers/buildPhaseQueue";

function App() {
  // Settings state
  const [settings, setSettings] = useState<PomodoroSettings>({
    rounds: DEFAULT_ROUNDS,
    workTime: DEFAULT_WORK_TIME_MINUTES * 60,
    breakTime: DEFAULT_BREAK_TIME_MINUTES * 60,
    warmupTime: DEFAULT_WARMUP_TIME_MINUTES * 60,
  });

  // Status state
  const [status, setStatus] = useState<PomodoroStatus>({
    isSetupShown: DEFAULT_IS_SETUP_SHOWN,
    isRunning: false,
    hasStarted: false,
    isFinished: false,
    currentRound: 1,
    phaseQueue: buildPhaseQueue(
      DEFAULT_ROUNDS,
      DEFAULT_WORK_TIME_MINUTES * 60,
      DEFAULT_BREAK_TIME_MINUTES * 60,
      DEFAULT_WARMUP_TIME_MINUTES * 60
    ),
    phaseIndex: 0,
  });

  //Currently only two styles for entire thing
  const phaseStyle =
    status.phaseQueue[status.phaseIndex].name === "work"
      ? "work-phase"
      : "break-phase";

  useEffect(() => {
    document.title = `${status.phaseQueue[
      status.phaseIndex
    ].name.toUpperCase()} – ${convertNumToTimeString(
      status.phaseQueue[status.phaseIndex].timeRemaining
    )}`;
  }, [status.phaseQueue[status.phaseIndex]]);

  return (
    <div className={`app-wrapper ${phaseStyle}`}>
      <Header />
      <MainContainer
        settings={settings}
        setSettings={setSettings}
        status={status}
        setStatus={setStatus}
      />
      <GithubButton id="github-link" />
    </div>
  );
}

export default App;
