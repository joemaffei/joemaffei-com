import { describe, expect, it } from "vitest";
import { normalizeCalendarEvent } from "./gig-calendar";

describe("normalizeCalendarEvent", () => {
  it("passes timed events through unchanged", () => {
    const event = {
      id: "abc",
      start: { dateTime: "2026-06-15T20:00:00-05:00" },
      end: { dateTime: "2026-06-15T23:00:00-05:00" },
    };
    expect(normalizeCalendarEvent(event)).toBe(event);
  });

  it("normalizes all-day events to local midnight–23:59:59 on the same date", () => {
    const result = normalizeCalendarEvent({
      id: "abc",
      start: { date: "2026-06-15" },
      end: { date: "2026-06-16" },
    });

    const start = new Date(result.start!.dateTime!);
    const end = new Date(result.end!.dateTime!);

    expect(start).toEqual(new Date("2026-06-15T00:00:00"));
    expect(end).toEqual(new Date("2026-06-15T23:59:59"));
  });

  it("keeps all-day event start and end on the same calendar date", () => {
    const result = normalizeCalendarEvent({
      id: "abc",
      start: { date: "2026-06-15" },
      end: { date: "2026-06-16" },
    });

    const start = new Date(result.start!.dateTime!);
    const end = new Date(result.end!.dateTime!);

    expect(start.getDate()).toBe(end.getDate());
    expect(start.getMonth()).toBe(end.getMonth());
    expect(start.getFullYear()).toBe(end.getFullYear());
  });
});
