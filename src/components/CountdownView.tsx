import type { PomodoroSettings, PomodoroStatus } from "../config";
import PlayPauseButton from "./Buttons/PlayPauseButton";
import RestartButton from "./Buttons/RestartButton";
import SettingsButton from "./Buttons/SettingsButton";
import SkipButton from "./Buttons/SkipButton";
import CountdownTimer from "./CountdownTimer";

interface CountdownViewProps {
  settings: PomodoroSettings;
  status: PomodoroStatus;
  setStatus: React.Dispatch<React.SetStateAction<PomodoroStatus>>;
}
function CountdownView({ settings, status, setStatus }: CountdownViewProps) {
  const handleFinish = () => {
    switch (status.currentPhase.name) {
      case "warmup":
        setStatus((prev) => ({
          ...prev,
          currentPhase: { name: "work", timeRemaining: settings.workTime },
          isRunning: true, // auto-start work phase after warmup
          hasStarted: true,
        }));
        break;
      case "work":
        if (status.currentRound < settings.rounds) {
          setStatus((prev) => ({
            ...prev,
            currentPhase: { name: "break", timeRemaining: settings.breakTime },
            isRunning: true, // auto-start break
          }));
        } else {
          // All rounds done
          setStatus((prev) => ({
            ...prev,
            isFinished: true,
            isRunning: false,
            currentPhase: { ...prev.currentPhase, timeRemaining: 0 },
          }));
        }
        break;
      case "break":
        // If we just finished a break, move to next work round
        setStatus((prev) => ({
          ...prev,
          currentRound: prev.currentRound + 1,
          currentPhase: { name: "work", timeRemaining: settings.workTime },
          isRunning: true, // auto-start next round
        }));
        break;

      default:
        break;
    }
  };

  const reset = () => {
    if (settings.warmupOn) {
      // If warmup is on, start with warmup phase
      setStatus((prev) => ({
        ...prev,
        hasStarted: false,
        currentRound: 1,
        currentPhase: { name: "warmup", timeRemaining: settings.warmupTime },
        isFinished: false,
        isRunning: false,
      }));
      return;
    } else {
      // Reset back to round 1, work phase if in workphase
      setStatus((prev) => ({
        ...prev,
        hasStarted: false,
        currentRound: 1,
        currentPhase: { name: "work", timeRemaining: settings.workTime },
        isFinished: false,
        isRunning: false,
      }));
    }
  };

  const pauseUnpause = () => {
    setStatus((prev) => ({
      ...prev,
      isRunning: !prev.isRunning,
      hasStarted: true,
    }));
  };
  return (
    <div>
      <h1 className="countdown-header">
        {status.currentPhase.name.toUpperCase()}
      </h1>
      <h3 className="countdown-header">
        {status.isFinished ? (
          "Pomodoro Complete"
        ) : (
          <>
            Round <span>{status.currentRound}</span> of{" "}
            <span>{settings.rounds}</span>
          </>
        )}
      </h3>{" "}
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
      <div className="main-buttons">
        <div className="action-buttons">
          {/* Reset should only show when paused, but has started OR */}
          {status.hasStarted && !status.isRunning && (
            <RestartButton tooltip="Restart Pomodoro" onClick={reset} />
          )}
          {/* Start/Pause only show when NOT finished */}
          {!status.isFinished && (
            <PlayPauseButton
              tooltip={status.isRunning ? "Pause" : "Play"}
              isRunning={status.isRunning}
              onClick={pauseUnpause}
            />
          )}
          {/*Skip show only show when paused, has started, and isn't finished*/}
          {status.hasStarted && !status.isFinished && !status.isRunning && (
            <SkipButton tooltip="Skip Phase" onClick={handleFinish} />
          )}
        </div>
        <SettingsButton
          tooltip="Open Settings"
          onClick={() =>
            setStatus((prev) => ({
              ...prev,
              isRunning: false,
              isSetupShown: true,
            }))
          }
        />
      </div>
    </div>
  );
}

export default CountdownView;
