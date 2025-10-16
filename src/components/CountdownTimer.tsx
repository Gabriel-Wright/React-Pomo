// CountdownText.tsx
import { useEffect } from "react";
import { convertNumToTimeString } from "../helpers";
interface CountdownProps {
  time: number; // seconds
  isRunning: boolean;
  onFinish: () => void;
  onTick: (newTime: number) => void;
}

function CountdownText({ time, isRunning, onTick, onFinish }: CountdownProps) {
  const timerCountdownSound = new Audio(
    import.meta.env.BASE_URL + "/sound/countdown321.wav"
  );

  const timerCountdownFinish = new Audio(
    import.meta.env.BASE_URL + "/sound/countdownGo.wav"
  );

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      if (time == 3 || time == 2 || time == 1) {
        timerCountdownSound
          .play()
          .catch((err) => console.log("Audio play error:", err));
      }
      if (time <= 0) {
        timerCountdownFinish
          .play()
          .catch((err) => console.log("Audio play error:", err));

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
