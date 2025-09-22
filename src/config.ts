export const DEFAULT_ROUNDS = 3;
export const DEFAULT_WORK_TIME = 25;
export const DEFAULT_BREAK_TIME = 5;
export const DEFAULT_IS_SETUP_SHOWN = false;

export interface PomodoroSettings {
  rounds: number;
  workTime: number;
  breakTime: number;
}

export type Phase = "work" | "break" | "finished";

export interface PomodoroStatus {
  isSetupShown: boolean;
  isRunning: boolean;
  hasStarted: boolean;
  isFinished: boolean;
  currentRound: number;

  currentPhase: {
    name: Phase;
    timeRemaining: number;
  };
}

