export const timeToSeconds = (hours, minutes) => {
  return Math.floor((+hours * 3600) + (minutes * 60));
}
