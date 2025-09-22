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
  const timerSound = new Audio(
    import.meta.env.BASE_URL + "/sound/confirmation_002.ogg"
  );
  const handleFinish = () => {
    timerSound.play().catch((err) => console.log("Audio play error:", err)); // Transition to next phase when current one ends
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
        setStatus((prev) => ({
          ...prev,
          isFinished: true,
          isRunning: false,
          currentPhase: { ...prev.currentPhase, timeRemaining: 0 },
        }));
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
      hasStarted: false,
      currentRound: 1,
      currentPhase: { name: "work", timeRemaining: settings.workTime },
      isFinished: false,
      isRunning: false,
    }));
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
            <RestartButton onClick={reset} />
          )}
          {/* Start/Pause only show when NOT finished */}
          {!status.isFinished && (
            <PlayPauseButton
              isRunning={status.isRunning}
              onClick={pauseUnpause}
            />
          )}
          {/*Skip show only show when paused, has started, and isn't finished*/}
          {status.hasStarted && !status.isFinished && !status.isRunning && (
            <SkipButton onClick={handleFinish} />
          )}
        </div>
        <SettingsButton
          onClick={() =>
            setStatus((prev) => ({
              ...prev,
              isRunning: false,
              isSetupShown: true,
            }))
          }
        />{" "}
      </div>
    </div>
  );
}

export default CountdownView;
