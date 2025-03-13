export function getEpochTime():string{
  const currentEpochTimeInSeconds: number = Math.floor(Date.now() / 1000);
  return currentEpochTimeInSeconds.toString();
}

export function dateToEpochTime(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

export function epochTimeToDate(epochTime: number): Date {
  return new Date(epochTime * 1000);
}