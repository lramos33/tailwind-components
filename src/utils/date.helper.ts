/**
 * Checks if the given date is today.
 * @param date - The date to check. Can be a Date object or an ISO string.
 * @returns True if the date is today, false otherwise.
 */
export function isToday(date: Date | string): boolean {
  const today = new Date();
  const compareDate = new Date(date);

  return compareDate.getDate() === today.getDate() && compareDate.getMonth() === today.getMonth() && compareDate.getFullYear() === today.getFullYear();
}
