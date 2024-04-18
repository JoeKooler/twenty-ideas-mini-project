/**
 * Just a normal function to convert seconds in to milliseconds
 * @param seconds
 * @returns Seconds => Seconds * 1000 => Milliseconds
 */
export const secsToMs = (seconds: number) => {
  return seconds * 1000;
};

/**
 * Function to convert day/days to milliseconds
 * @param days
 * @returns Days => Seconds in one day * days => Milliseconds
 */
export const daysToMs = (days: number) => {
  const SECS_IN_ONE_DAY = 86400;
  return secsToMs(SECS_IN_ONE_DAY * days);
};
