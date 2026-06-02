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

  it("normalizes all-day events to timezone-free strings so they parse as local time everywhere", () => {
    const result = normalizeCalendarEvent({
      id: "abc",
      start: { date: "2026-06-15" },
      end: { date: "2026-06-16" },
    });

    // Must be timezone-free (no Z, no offset) so new Date() always treats them as local
    expect(result.start!.dateTime).toBe("2026-06-15T00:00:00");
    expect(result.end!.dateTime).toBe("2026-06-15T23:59:59");
  });

  it("keeps all-day event start and end on the same calendar date when parsed locally", () => {
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

  it("does not produce a UTC-offset string that would resolve to the previous day in negative-offset timezones", () => {
    const result = normalizeCalendarEvent({
      id: "abc",
      start: { date: "2026-06-27" },
      end: { date: "2026-06-28" },
    });

    // A UTC ISO string like "2026-06-27T00:00:00.000Z" would render as June 26 in CDT (UTC-5).
    // The stored string must NOT end in Z or contain a + offset.
    expect(result.start!.dateTime).not.toMatch(/Z$/);
    expect(result.start!.dateTime).not.toMatch(/[+-]\d{2}:\d{2}$/);
  });
});
