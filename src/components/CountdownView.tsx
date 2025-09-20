import type { PomodoroStatus } from "../config";

interface CountdownViewProps {
  status: PomodoroStatus;
  setStatus: React.Dispatch<React.SetStateAction<PomodoroStatus>>;
}
function CountdownView({ status, setStatus }: CountdownViewProps) {
  return <h1>{status.completedRounds}</h1>;
}

export default CountdownView;
