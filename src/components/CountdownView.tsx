import { useEffect } from "react";
import type { PomodoroStatus } from "../config";
import CountdownTimer from "./CountdownTimer";

interface CountdownViewProps {
  numRounds: number;
  status: PomodoroStatus;
  setStatus: React.Dispatch<React.SetStateAction<PomodoroStatus>>;
}
function CountdownView({ numRounds, status, setStatus }: CountdownViewProps) {
  return (
    <div>
      <button onClick={() => reset(setStatus)}>Reset</button>
      <CountdownTimer
        time={status.workTimeRemaining}
        isRunning={status.isRunning}
        onTick={(newTime) =>
          setStatus((prev) => ({ ...prev, workTimeRemaining: newTime }))
        }
        onFinish={() => setStatus((prev) => ({ ...prev, isRunning: false }))}
      />
    </div>
  );
}

function reset(
  setStatus: React.Dispatch<React.SetStateAction<PomodoroStatus>>
) {
  setStatus((prev) => ({
    ...prev,
    workTimeRemaining: 600, // reset timer
    isRunning: true, // start countdown
  }));
}

export default CountdownView;
