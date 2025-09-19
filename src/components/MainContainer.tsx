import { useState, type ReactNode } from "react";

interface Props {
  isSetup?: boolean;
  numRounds?: number;
  workTime?: number;
  breakTime?: number;
}

function MainContainer({
  isSetup = false,
  numRounds = 3,
  workTime = 25,
  breakTime = 5,
}: Props) {
  const [rounds, setRounds] = useState(numRounds);
  const [time, setTime] = useState("00:25"); // default 25 minutes
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  return (
    <div className="main-container">
      {!isSetup && (
        <div>
          <label>Num Rounds: </label>
          <input
            type="number"
            min={1}
            max={20}
            value={rounds}
            onChange={(e) => setRounds(clamp(parseInt(e.target.value), 1, 20))}
          ></input>
          <label>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            step={60}
          />
          <label>Work Duration:</label>
          <input
            type="number"
            min={0}
            max={59}
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
          />{" "}
          min
          <input
            type="number"
            min={0}
            max={59}
            value={15}
            onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
          />{" "}
          sec
          <p>Total seconds: {minutes * 60 + seconds}</p>
        </div>
      )}
    </div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default MainContainer;
