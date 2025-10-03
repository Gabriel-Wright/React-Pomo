export const DEFAULT_ROUNDS = 3;
export const DEFAULT_WORK_TIME_MINUTES = 25;
export const DEFAULT_BREAK_TIME_MINUTES = 5;
export const DEFAULT_WARMUP_TIME_MINUTES = 0;
export const DEFAULT_IS_SETUP_SHOWN = false;
export const MAX_ROUNDS = 10;
export const MIN_ROUNDS = 1;
export const MAX_WORK_MINUTES = 60;
export const MIN_WORK_MINUTES = 1;
export const MAX_BREAK_MINUTES = 30;
export const MIN_BREAK_MINUTES = 1;
export interface PomodoroSettings {
  rounds: number;
  workTime: number;
  breakTime: number;
  warmupTime: number;
}

export type PhaseName = "warmup" | "work" | "break" | "finished";

export interface Phase {
  name: PhaseName;
  timeRemaining: number;
}

export interface PomodoroStatus {
  isSetupShown: boolean;
  isRunning: boolean;
  hasStarted: boolean;
  isFinished: boolean;
  currentRound: number;

  phaseQueue: Phase[];
  phaseIndex: number;
}


