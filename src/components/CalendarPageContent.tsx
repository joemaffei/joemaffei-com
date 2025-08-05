"use client";

import CalendarGrid from "@/components/CalendarGrid";
import CalendarList from "@/components/CalendarList";
import { calendar_v3 } from "googleapis";
import { ChevronLeft, ChevronRight, Grid3X3, List } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HTMLAttributes, useEffect } from "react";

type CalendarPageContentProps = HTMLAttributes<HTMLDivElement> & {
  events: calendar_v3.Schema$Event[];
  eventMap: Map<string, calendar_v3.Schema$Event>;
};

type CalendarMode = "grid" | "list";

// const ONE_DAY_IN_MILLIS = 86_400_000;

const buttonClasses =
  "flex gap-x-2 items-center px-2 py-1 text-sm rounded aria-selected:bg-white text-black";

export default function CalendarPageContent({
  events,
  eventMap,
}: CalendarPageContentProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const calendarMode = searchParams.get("mode");
  const yearParam = searchParams.get("year");
  const currentYear = new Date().getFullYear();
  const selectedYear = yearParam ? parseInt(yearParam, 10) : null;

  // Filter events for list mode
  const listEvents = events.filter((event) => {
    if (!event.start?.dateTime) return false;
    const eventDate = new Date(event.start.dateTime);

    if (selectedYear) {
      // Show all events for the selected year
      return eventDate.getFullYear() === selectedYear;
    } else {
      // Show events for the next 12 months (Present view)
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today

      const twelveMonthsFromNow = new Date(today);
      twelveMonthsFromNow.setFullYear(today.getFullYear() + 1);

      return eventDate >= today && eventDate < twelveMonthsFromNow;
    }
  });

  useEffect(() => {
    // default the mode to grid
    if (!searchParams.get("mode")) {
      updateSearchParam("mode", "grid");
    }
  }, []);

  // TODO: refactor this AI-generated crap
  const updateSearchParam = (name: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (value !== undefined && value !== "") {
      current.set(name, value);
    } else {
      current.delete(name);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.replace(`${pathname}${query}`);
  };

  const setCalendarMode = (mode: "grid" | "list") => {
    updateSearchParam("mode", mode);
  };

  const setYear = (year: number | null) => {
    if (year === null) {
      updateSearchParam("year", "");
    } else {
      updateSearchParam("year", year.toString());
    }
  };

  return (
    <div>
      <header className="mb-4 flex gap-x-8 items-center">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <div
          role="tablist"
          className="flex gap-x-1 bg-orange-400 dark:bg-orange-500 p-1 rounded-lg"
        >
          <button
            role="tab"
            aria-controls="calendar-grid"
            aria-selected={calendarMode === "grid"}
            className={buttonClasses}
            onClick={() => setCalendarMode("grid")}
          >
            <Grid3X3 />
            grid
          </button>
          <button
            role="tab"
            aria-controls="calendar-list"
            aria-selected={calendarMode === "list"}
            className={buttonClasses}
            onClick={() => setCalendarMode("list")}
          >
            <List />
            list
          </button>
        </div>
      </header>
      {calendarMode === "grid" && (
        <CalendarGrid id="calendar-grid" events={events} eventMap={eventMap} />
      )}
      {calendarMode === "list" && (
        <>
          <div className="mb-8">
            <div
              className={`flex justify-center mb-4 ${
                selectedYear ? "visible" : "invisible"
              }`}
            >
              <button
                className="text-sm text-orange-600 dark:text-orange-500 font-medium"
                onClick={() => setYear(null)}
              >
                Present
              </button>
            </div>

            <div className="flex justify-between items-center">
              <button
                className="flex items-center text-sm text-orange-600 dark:text-orange-500"
                onClick={() => {
                  if (selectedYear) {
                    setYear(selectedYear - 1);
                  } else {
                    setYear(currentYear);
                  }
                }}
              >
                <ChevronLeft />
                {selectedYear
                  ? (selectedYear - 1).toString()
                  : currentYear.toString()}
              </button>

              <h2 className="text-center text-xl font-semibold dark:text-slate-100">
                {selectedYear ? selectedYear.toString() : "Upcoming Events"}
              </h2>

              <button
                className="flex items-center text-sm text-orange-600 dark:text-orange-500"
                onClick={() => {
                  if (selectedYear) {
                    setYear(selectedYear + 1);
                  } else {
                    setYear(currentYear + 1);
                  }
                }}
              >
                {selectedYear
                  ? (selectedYear + 1).toString()
                  : (currentYear + 1).toString()}
                <ChevronRight />
              </button>
            </div>
          </div>

          {listEvents.length > 0 ? (
            <CalendarList id="calendar-list" events={listEvents} />
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-400 py-8">
              No calendar dates to display
            </div>
          )}
        </>
      )}
    </div>
  );
}
