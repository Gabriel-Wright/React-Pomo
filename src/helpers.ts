export const convertNumToTimeString = (num: number) => {
  const minutes = Math.floor(num / 60);
  const seconds = num % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};