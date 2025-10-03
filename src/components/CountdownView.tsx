import type { PomodoroSettings, PomodoroStatus } from "../config";
import { buildPhaseQueue } from "../helpers/buildPhaseQueue";
import PlayPauseButton from "./Buttons/PlayPauseButton";
import RestartButton from "./Buttons/RestartButton";
import SettingsButton from "./Buttons/SettingsButton";
import SkipButton from "./Buttons/SkipButton";
import CountdownText from "./CountdownTimer";

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
    setStatus((prev) => {
      const nextIndex = prev.phaseIndex + 1;
      const isFinished = nextIndex >= prev.phaseQueue.length;
      return {
        ...prev,
        phaseIndex: isFinished ? prev.phaseIndex : nextIndex,
        //Iterate round count if there is a break
        currentRound:
          status.phaseQueue[status.phaseIndex].name === "break"
            ? prev.currentRound + 1
            : prev.currentRound,
        isRunning: !isFinished,
        isFinished,
        hasStarted: true,
      };
    });
  };

  const reset = () => {
    // Reset back to round 1, work phase
    setStatus((prev) => ({
      ...prev,
      hasStarted: false,
      currentRound: 1,
      phaseIndex: 0,
      phaseQueue: buildPhaseQueue(
        settings.rounds,
        settings.workTime,
        settings.breakTime,
        settings.warmupTime
      ),
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
        {status.phaseQueue[status.phaseIndex].name.toUpperCase()}
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
      <CountdownText
        time={status.phaseQueue[status.phaseIndex].timeRemaining}
        isRunning={status.isRunning}
        onTick={(newTime) =>
          setStatus((prev) => {
            const newQueue = [...prev.phaseQueue]; // shallow copy
            newQueue[prev.phaseIndex] = {
              ...newQueue[prev.phaseIndex],
              timeRemaining: newTime,
            };
            return { ...prev, phaseQueue: newQueue };
          })
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
