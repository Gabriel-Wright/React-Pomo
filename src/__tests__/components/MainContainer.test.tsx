/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MainContainer from "../../components/MainContainer";
import type { PomodoroSettings, PomodoroStatus } from "../../config";

jest.mock("../../components/SetupView", () => ({
  __esModule: true,
  default: () => <div data-testid="setup-view" />,
}));
jest.mock("../../components/CountdownView", () => ({
  __esModule: true,
  default: () => <div data-testid="countdown-view" />,
}));

describe("MainContainer Component", () => {
  const mockSettings: PomodoroSettings = {
    rounds: 1,
    workTime: 1500,
    breakTime: 300,
    warmupOn: false,
    warmupTime: 300,
    theme: 1,
  };

  const setSettings = jest.fn();
  const setStatus = jest.fn();

  test("renders SetupView when isSetupShown is true", () => {
    const mockStatus: PomodoroStatus = {
      isSetupShown: true,
      isRunning: false,
      hasStarted: false,
      isFinished: false,
      currentRound: 1,
      currentPhase: { name: "work", timeRemaining: 1500 },
    };

    render(
      <MainContainer
        settings={mockSettings}
        setSettings={setSettings}
        status={mockStatus}
        setStatus={setStatus}
      />
    );

    expect(screen.getByTestId("setup-view")).toBeInTheDocument();
    expect(screen.queryByTestId("countdown-view")).not.toBeInTheDocument();
  });
  test("renders CountdownView when isSetupShown is false", () => {
    const mockStatus: PomodoroStatus = {
      isSetupShown: false,
      isRunning: true,
      hasStarted: true,
      isFinished: false,
      currentRound: 1,
      currentPhase: { name: "work", timeRemaining: 1500 },
    };

    render(
      <MainContainer
        settings={mockSettings}
        setSettings={setSettings}
        status={mockStatus}
        setStatus={setStatus}
      />
    );

    expect(screen.getByTestId("countdown-view")).toBeInTheDocument();
    expect(screen.queryByTestId("setup-view")).not.toBeInTheDocument();
  });
});
