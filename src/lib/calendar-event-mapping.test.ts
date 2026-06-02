import { describe, expect, it } from "vitest";
import { toCalendarDayEvent } from "./calendar-event-mapping";

describe("toCalendarDayEvent", () => {
  it("uses startDate as endDate so events appear on a single day", () => {
    const event = {
      id: "evt1",
      start: { dateTime: "2026-06-15T20:00:00-05:00" },
      end: { dateTime: "2026-06-16T00:00:00-05:00" },
    };
    const result = toCalendarDayEvent(event);
    expect(result.startDate).toEqual(result.endDate);
  });

  it("does not bleed a midnight-ending event into the next day", () => {
    const event = {
      id: "evt2",
      start: { dateTime: "2026-06-15T20:00:00-05:00" },
      end: { dateTime: "2026-06-16T00:00:00-05:00" },
    };
    const result = toCalendarDayEvent(event);
    expect(result.endDate.getDate()).toBe(result.startDate.getDate());
  });

  it("sets the note to the event id", () => {
    const event = {
      id: "evt3",
      start: { dateTime: "2026-06-15T20:00:00-05:00" },
      end: { dateTime: "2026-06-15T22:00:00-05:00" },
    };
    expect(toCalendarDayEvent(event).note).toBe("evt3");
  });

  it("parses the start dateTime correctly", () => {
    const event = {
      id: "evt4",
      start: { dateTime: "2026-07-04T19:00:00Z" },
      end: { dateTime: "2026-07-04T21:00:00Z" },
    };
    const result = toCalendarDayEvent(event);
    expect(result.startDate).toEqual(new Date("2026-07-04T19:00:00Z"));
  });
});
