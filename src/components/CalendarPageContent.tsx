"use client";

import CalendarGrid from "@/components/CalendarGrid";
import CalendarList from "@/components/CalendarList";
// import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CalendarEvent } from "@/services/gig-calendar";
// import { useLocalStorage } from "@uidotdev/usehooks";
import { Grid3X3, List } from "lucide-react";
import { HTMLAttributes } from "react";
import { useLocalStorage } from "usehooks-ts";

type CalendarPageContentProps = HTMLAttributes<HTMLDivElement> & {
  events: CalendarEvent[];
  eventMap: Map<string, CalendarEvent>;
};

type CalendarMode = "grid" | "list";

const ONE_DAY_IN_MILLIS = 86_400_000;

const buttonClasses =
  "flex gap-x-2 items-center px-2 py-1 text-sm rounded aria-selected:bg-white text-black";

export default function CalendarPageContent({
  events,
  eventMap,
}: CalendarPageContentProps) {
  const [calendarMode, setCalendarMode] = useLocalStorage<CalendarMode>(
    "calendarMode",
    "grid",
    /**
     * initializeWithValue must be set to false in an SSR context.
     *
     * @see https://medium.com/@lean1190/uselocalstorage-hook-for-next-js-typed-and-ssr-friendly-4ddd178676df
     * @see https://usehooks-ts.com/react-hook/use-local-storage
     */
    { initializeWithValue: false }
  );

  const today = new Date().getTime();
  const yesterday = today - ONE_DAY_IN_MILLIS;
  const oneYearFromNow = today + ONE_DAY_IN_MILLIS * 365;

  const listEvents = events.filter((event) => {
    const eventStart = new Date(event.start).getTime();
    return eventStart >= yesterday && eventStart < oneYearFromNow;
  });

  return (
    <div>
      <header className="mb-8 flex gap-x-8 items-center">
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
        <CalendarList id="calendar-list" events={listEvents} />
      )}
    </div>
  );
}
