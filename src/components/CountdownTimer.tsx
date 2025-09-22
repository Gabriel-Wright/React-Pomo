// CountdownText.tsx
import { useEffect } from "react";
import type { PomodoroStatus } from "../config";
import { convertNumToTimeString } from "../helpers";
interface CountdownProps {
  time: number; // seconds
  isRunning: boolean;
  onFinish: () => void;
  onTick: (newTime: number) => void;
}

function CountdownText({ time, isRunning, onTick, onFinish }: CountdownProps) {
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      if (time <= 0) {
        clearInterval(timer);
        onFinish();
      } else {
        onTick(time - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, time, onTick, onFinish]);

  return <h1 className="countdown-display">{convertNumToTimeString(time)}</h1>;
}

export default CountdownText;
