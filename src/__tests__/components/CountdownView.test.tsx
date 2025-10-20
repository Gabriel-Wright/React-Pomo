/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CountdownView from "../../components/CountdownView";
import type { PomodoroSettings, PomodoroStatus } from "../../config";

jest.mock("../../components/CountdownTimer", () => {
  function MockCountdownTimer(props: any) {
    return (
      <div data-testid="countdown-timer">
        <button data-testid="finish-button" onClick={() => props.onFinish?.()}>
          Finish
        </button>
      </div>
    );
  }
  return {
    __esModule: true,
    default: MockCountdownTimer,
  };
});
jest.mock("../../components/Buttons/PlayPauseButton", () => ({
  __esModule: true,
  default: () => <div data-testid="play-pause-button" />,
}));
jest.mock("../../components/Buttons/RestartButton", () => ({
  __esModule: true,
  default: () => <div data-testid="restart-button" />,
}));
jest.mock("../../components/Buttons/SettingsButton", () => ({
  __esModule: true,
  default: () => <div data-testid="settings-button" />,
}));
jest.mock("../../components/Buttons/SkipButton", () => ({
  __esModule: true,
  default: () => <div data-testid="skip-button" />,
}));

describe("CountdownView Component", () => {
  const mockSettings: PomodoroSettings = {
    rounds: 3,
    workTime: 1500,
    breakTime: 300,
    warmupOn: false,
    warmupTime: 300,
    theme: 1,
  };

  const setStatus = jest.fn();

  test("renders CountdownView when running", () => {
    const mockStatus: PomodoroStatus = {
      isSetupShown: false,
      isRunning: true,
      hasStarted: true,
      isFinished: false,
      currentRound: 1,
      currentPhase: { name: "work", timeRemaining: 1500 },
    };

    render(
      <CountdownView
        settings={mockSettings}
        status={mockStatus}
        setStatus={setStatus}
      />
    );

    expect(screen.getByText("WORK")).toBeInTheDocument();
    expect(screen.getByTestId("countdown-timer")).toBeInTheDocument();
    expect(screen.getByTestId("play-pause-button")).toBeInTheDocument();
    expect(screen.getByTestId("settings-button")).toBeInTheDocument();
  });

  test("renders CountdownView when on break", () => {
    const mockStatus: PomodoroStatus = {
      isSetupShown: false,
      isRunning: true,
      hasStarted: true,
      isFinished: false,
      currentRound: 1,
      currentPhase: { name: "break", timeRemaining: 300 },
    };

    render(
      <CountdownView
        settings={mockSettings}
        status={mockStatus}
        setStatus={setStatus}
      />
    );

    expect(screen.getByText("BREAK")).toBeInTheDocument();
    expect(screen.getByTestId("countdown-timer")).toBeInTheDocument();
    expect(screen.getByTestId("play-pause-button")).toBeInTheDocument();
    expect(screen.getByTestId("settings-button")).toBeInTheDocument();
  });

  test("renders CountdownView when finished", () => {
    const mockStatus: PomodoroStatus = {
      isSetupShown: false,
      isRunning: false,
      hasStarted: true,
      isFinished: true,
      currentRound: 1,
      currentPhase: { name: "work", timeRemaining: 0 },
    };

    render(
      <CountdownView
        settings={mockSettings}
        status={mockStatus}
        setStatus={setStatus}
      />
    );

    expect(screen.getByTestId("restart-button")).toBeInTheDocument();
    expect(screen.getByTestId("settings-button")).toBeInTheDocument();
  });

  test("renders CountdownView when paused", () => {
    const mockStatus: PomodoroStatus = {
      isSetupShown: false,
      isRunning: false,
      hasStarted: true,
      isFinished: false,
      currentRound: 1,
      currentPhase: { name: "work", timeRemaining: 1200 },
    };

    render(
      <CountdownView
        settings={mockSettings}
        status={mockStatus}
        setStatus={setStatus}
      />
    );

    expect(screen.getByText("WORK")).toBeInTheDocument();
    expect(screen.getByTestId("countdown-timer")).toBeInTheDocument();
    expect(screen.getByTestId("play-pause-button")).toBeInTheDocument();
    expect(screen.getByTestId("settings-button")).toBeInTheDocument();
  });

  test("renders current round correctly", () => {
    const mockStatus: PomodoroStatus = {
      isSetupShown: false,
      isRunning: true,
      hasStarted: true,
      isFinished: false,
      currentRound: 2,
      currentPhase: { name: "work", timeRemaining: 1500 },
    };

    const additionalMockSettings: PomodoroSettings = {
      rounds: 4,
      workTime: 1500,
      breakTime: 300,
      warmupOn: false,
      warmupTime: 300,
      theme: 1,
    };
    render(
      <CountdownView
        settings={additionalMockSettings}
        status={mockStatus}
        setStatus={setStatus}
      />
    );

    //Round 2 of 4
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  test("handleFinish moves from work phase to break phase", () => {
    const mockStatus: PomodoroStatus = {
      isSetupShown: false,
      isRunning: true,
      hasStarted: true,
      isFinished: false,
      currentRound: 1,
      currentPhase: { name: "work", timeRemaining: 1500 },
    };

    const setStatus = jest.fn();

    render(
      <CountdownView
        settings={mockSettings}
        status={mockStatus}
        setStatus={setStatus}
      />
    );

    // click mocked finish button to trigger handleFinish
    const finishButton = screen.getByTestId("finish-button");
    finishButton.click();

    const setStatusFn = setStatus.mock.calls[0][0];
    const newState = setStatusFn(mockStatus);

    expect(newState.currentPhase.name).toBe("break");
    expect(newState.currentPhase.timeRemaining).toBe(mockSettings.breakTime);
    expect(newState.isRunning).toBe(true);
  });
});
