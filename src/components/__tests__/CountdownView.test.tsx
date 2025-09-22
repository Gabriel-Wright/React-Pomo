// // src/components/CountdownView.test.tsx
// import { render, screen, fireEvent } from "@testing-library/react";
// import CountdownView from "../CountdownView";
// import type { PomodoroSettings, PomodoroStatus } from "../../config";

// const settings: PomodoroSettings = { rounds: 2, workTime: 25, breakTime: 5 };

// const makeStatus = (overrides: Partial<PomodoroStatus>): PomodoroStatus => ({
//   isSetupShown: false,
//   isRunning: false,
//   isFinished: false,
//   hasStarted: false,
//   currentRound: 1,
//   currentPhase: { name: "work", timeRemaining: 25 },
//   ...overrides,
// });
