import type { Phase } from "../config";

export function buildPhaseQueue(rounds: number, workTime: number, breakTime: number, warmupTime: number) : Phase[] {
    const phaseQueue: Phase[] = [];

    if(warmupTime>0) {
        phaseQueue.push({name: "warmup", timeRemaining: warmupTime});
    }
      for (let i = 0; i < rounds; i++) {
        phaseQueue.push({ name: "work", timeRemaining: workTime });
        // Not add break on the last round
        if (i < rounds - 1) {
           phaseQueue.push({ name: "break", timeRemaining: breakTime });
        }
    }

    phaseQueue.push({name: "finished", timeRemaining: 0});
  
    return phaseQueue;
}