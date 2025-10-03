export const convertNumToTimeString = (num: number) => {
  const minutes = Math.floor(num / 60);
  const seconds = num % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const convertSecToMinString = (num: number): string => {
  const minutes = Math.floor(num / 60);

  if (minutes < 60) {
    return `${minutes} min${minutes !== 1 ? "s" : ""}`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""}`;
  }

  return `${hours} hour${hours !== 1 ? "s" : ""} ${remainingMinutes} min${
    remainingMinutes !== 1 ? "s" : ""
  }`;
};

export const clamp = (num: number, max: number, min: number): number =>
  Math.min(Math.max(num, min), max);

