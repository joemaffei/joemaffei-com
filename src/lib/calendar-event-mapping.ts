import { calendar_v3 } from "googleapis";

export function toCalendarDayEvent(event: calendar_v3.Schema$Event) {
  const startDate = new Date(event.start?.dateTime!);
  return {
    startDate,
    endDate: startDate,
    note: event.id!,
  };
}
