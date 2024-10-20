import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";

/**
 * Formats a given date into a string representing the full month range.
 * @param date The date to format
 * @returns A string in the format "MMM d, yyyy - MMM d, yyyy" representing the first and last day of the month
 */
export const formatMonthRange = (date: Date) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  const formatString = "MMM d, yyyy";
  return `${format(start, formatString)} - ${format(end, formatString)}`;
};

/**
 * Formats a given date into a string representing the full week range.
 * @param date The date to format
 * @returns A string in the format "MMM d, yyyy - MMM d, yyyy" representing the first and last day of the week
 */
export function formatWeekRange(date: Date): string {
  const start = startOfWeek(date);
  const end = endOfWeek(date);
  return `${format(start, "MMM d, yyyy")} - ${format(end, "MMM d, yyyy")}`;
}
