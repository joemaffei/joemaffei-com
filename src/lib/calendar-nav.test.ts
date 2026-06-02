import { describe, expect, it } from "vitest";
import {
  getNextMonthDate,
  getNextMonthLabel,
  getPrevMonthDate,
  getPrevMonthLabel,
} from "./calendar-nav";

describe("getNextMonthDate", () => {
  it("advances from June to July", () => {
    const d = getNextMonthDate(2026, "June");
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(6); // July = 6
    expect(d.getDate()).toBe(1);
  });

  it("advances from July to August", () => {
    const d = getNextMonthDate(2026, "July");
    expect(d.getMonth()).toBe(7); // August = 7
  });

  it("advances from August to September — not October", () => {
    const d = getNextMonthDate(2026, "August");
    expect(d.getMonth()).toBe(8); // September = 8
    expect(d.getDate()).toBe(1);
  });

  it("advances from September to October", () => {
    const d = getNextMonthDate(2026, "September");
    expect(d.getMonth()).toBe(9); // October = 9
  });

  it("wraps from December to January of the next year", () => {
    const d = getNextMonthDate(2026, "December");
    expect(d.getFullYear()).toBe(2027);
    expect(d.getMonth()).toBe(0);
  });
});

describe("getPrevMonthDate", () => {
  it("goes back from July to June", () => {
    const d = getPrevMonthDate(2026, "July");
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(5); // June = 5
    expect(d.getDate()).toBe(1);
  });

  it("wraps from January to December of the previous year", () => {
    const d = getPrevMonthDate(2026, "January");
    expect(d.getFullYear()).toBe(2025);
    expect(d.getMonth()).toBe(11);
  });
});

describe("getNextMonthLabel", () => {
  it("returns 'September 2026' when on August 2026 — not October", () => {
    expect(getNextMonthLabel(2026, "August")).toBe("September 2026");
  });

  it("returns 'July 2026' when on June 2026", () => {
    expect(getNextMonthLabel(2026, "June")).toBe("July 2026");
  });

  it("returns 'January 2027' when on December 2026", () => {
    expect(getNextMonthLabel(2026, "December")).toBe("January 2027");
  });
});

describe("getPrevMonthLabel", () => {
  it("returns 'June 2026' when on July 2026", () => {
    expect(getPrevMonthLabel(2026, "July")).toBe("June 2026");
  });

  it("returns 'December 2025' when on January 2026", () => {
    expect(getPrevMonthLabel(2026, "January")).toBe("December 2025");
  });
});
