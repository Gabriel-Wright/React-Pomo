import { useEffect } from "react";
import type { PomodoroSettings, PomodoroStatus } from "../config";
import CountdownTimer from "./CountdownTimer";

interface CountdownViewProps {
  settings: PomodoroSettings;
  status: PomodoroStatus;
  setStatus: React.Dispatch<React.SetStateAction<PomodoroStatus>>;
}
function CountdownView({ settings, status, setStatus }: CountdownViewProps) {
  const handleFinish = () => {
    // Transition to next phase when current one ends
    if (status.currentPhase.name === "work") {
      // If we just finished a work session
      if (status.currentRound < settings.rounds) {
        setStatus((prev) => ({
          ...prev,
          currentPhase: { name: "break", timeRemaining: settings.breakTime },
          isRunning: true, // auto-start break
        }));
      } else {
        // All rounds done
        setStatus((prev) => ({ ...prev, isFinished: true, isRunning: false }));
      }
    } else if (status.currentPhase.name === "break") {
      // If we just finished a break, move to next work round
      setStatus((prev) => ({
        ...prev,
        currentRound: prev.currentRound + 1,
        currentPhase: { name: "work", timeRemaining: settings.workTime },
        isRunning: true, // auto-start next round
      }));
    }
  };

  const reset = () => {
    // Reset back to round 1, work phase
    setStatus((prev) => ({
      ...prev,
      currentRound: 1,
      currentPhase: { name: "work", timeRemaining: settings.workTime },
      isFinished: false,
      isRunning: false,
    }));
  };

  return (
    <div>
      <h2>
        Round {status.currentRound} of {settings.rounds}–{" "}
        {status.currentPhase.name.toUpperCase()}
      </h2>

      <CountdownTimer
        time={status.currentPhase.timeRemaining}
        isRunning={status.isRunning}
        onTick={(newTime) =>
          setStatus((prev) => ({
            ...prev,
            currentPhase: { ...prev.currentPhase, timeRemaining: newTime },
          }))
        }
        onFinish={handleFinish}
      />

      <button onClick={reset}>Reset</button>
      <button
        onClick={() =>
          setStatus((prev) => ({ ...prev, isRunning: !prev.isRunning }))
        }
      >
        {status.isRunning ? "Pause" : "Start"}
      </button>
      <button
        onClick={() =>
          setStatus((prev) => ({
            ...prev,
            isRunning: false,
            isSetupShown: true,
          }))
        }
      >
        Settings
      </button>
    </div>
  );
}

export default CountdownView;
