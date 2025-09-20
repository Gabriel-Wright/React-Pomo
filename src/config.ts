export const DEFAULT_ROUNDS = 3;
export const DEFAULT_WORK_TIME = 25;
export const DEFAULT_BREAK_TIME = 5;

export interface PomodoroSettings {
  rounds: number;
  workTime: number;
  breakTime: number;
}

export interface PomodoroStatus {
  isSetupShown: boolean;
  isRunning: boolean;
  isFinished: boolean;
  completedRounds: number;
  workTimeRemaining: number;
  breakTimeRemaining: number;
}

