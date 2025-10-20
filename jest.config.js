import { createDefaultPreset } from "ts-jest";

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "node",
  transform: {
    ...createDefaultPreset().transform,
  },
    globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
    },
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setupTests.ts"],
};
