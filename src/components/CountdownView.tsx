interface PomodoroStatus {
  isSetupShown: boolean;
  isRunning: boolean;
  isFinished: boolean;
  completedRounds: number;
  workTimeRemaining: number;
  breakTimeRemaining: number;
}

interface CountdownViewProps {
  status: PomodoroStatus;
  setStatus: React.Dispatch<React.SetStateAction<PomodoroStatus>>;
}
function CountdownView({ status, setStatus }: CountdownViewProps) {
  return <h1>{status.completedRounds}</h1>;
}

export default CountdownView;
