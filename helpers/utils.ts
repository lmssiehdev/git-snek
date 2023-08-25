import dayjs, { type Dayjs } from "dayjs";

/**
 * Formats a date as "YYYY-MM-DD".
 * @param  date - The date to format.
 * @returns The formatted date.
 */
export function formatedDate(date: Dayjs | string) {
  return dayjs(date).format("YYYY-MM-DD");
}
