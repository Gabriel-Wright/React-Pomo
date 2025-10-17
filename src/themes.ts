export type ThemeId = 1 | 2 | 3;

export interface ThemeColors {
  workBg: string;
  breakBg: string;
  warmupBg: string;
  workMainBg: string;
  breakMainBg: string;
  warmupMainBg: string;
}

export const THEMES: Record<ThemeId, ThemeColors> = {
  1: {
    workBg: "#C75538",
    breakBg: "#872FD0",
    warmupBg: "#37c850",

    workMainBg: "#863a26",
    breakMainBg: "#9A51D8",
    warmupMainBg: "#248435",
  },
  2: {
    workBg: "#41bea7",
    breakBg: "#b749c4",
    warmupBg: "#c0ae3f",

    workMainBg: "#3aa99e",
    breakMainBg: "#a138ad",
    warmupMainBg: "#9f9134",
  },
  3: {
    workBg: "#de2157",
    breakBg: "#2257dd",
    warmupBg: "#5bdb24",

    workMainBg: "#ac123a",
    breakMainBg: "#1940a4",
    warmupMainBg: "#3ba415",
  },
};

export function changeTheme(themeId: ThemeId, root: HTMLElement = document.documentElement) {
  const theme = THEMES[themeId];
  root.style.setProperty("--work-bg", theme.workBg);
  root.style.setProperty("--break-bg", theme.breakBg);
  root.style.setProperty("--warmup-bg", theme.warmupBg);
  root.style.setProperty("--work-main-bg", theme.workMainBg);
  root.style.setProperty("--break-main-bg", theme.breakMainBg);
  root.style.setProperty("--warmup-main-bg", theme.warmupMainBg);
}