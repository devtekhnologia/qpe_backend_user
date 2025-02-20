export function getEpochTime(): number {
  return Math.floor(Date.now() / 1000);
}

interface TimeValidationParams {
  time: string | string[];  // Accepts a single time string or an array of times
}

export function isValidTimeFormat({ time }: TimeValidationParams): boolean {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (Array.isArray(time)) {
      return time.every(t => timeRegex.test(t));
  }

  return timeRegex.test(time);
}