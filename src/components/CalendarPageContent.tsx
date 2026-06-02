"use client";

import CalendarList from "@/components/CalendarList";
import { calendar_v3 } from "googleapis";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HTMLAttributes, useCallback } from "react";

type CalendarPageContentProps = HTMLAttributes<HTMLDivElement> & {
  events: calendar_v3.Schema$Event[];
};

export default function CalendarPageContent({ events }: CalendarPageContentProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const yearParam = searchParams.get("year");
  const currentYear = new Date().getFullYear();
  const selectedYear = yearParam ? parseInt(yearParam, 10) : null;

  const setYear = useCallback((year: number | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (year === null) {
      current.delete("year");
    } else {
      current.set("year", year.toString());
    }
    const query = current.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`);
  }, [searchParams, router, pathname]);

  const listEvents = events.filter((event) => {
    if (!event.start?.dateTime) return false;
    const eventDate = new Date(event.start.dateTime);
    if (selectedYear) {
      return eventDate.getFullYear() === selectedYear;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const twelveMonthsFromNow = new Date(today);
    twelveMonthsFromNow.setFullYear(today.getFullYear() + 1);
    return eventDate >= today && eventDate < twelveMonthsFromNow;
  });

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Calendar</h1>
        <div className="flex justify-center mb-4">
          <button
            className={`text-sm text-orange-600 dark:text-orange-500 font-medium ${selectedYear ? "visible" : "invisible"}`}
            onClick={() => setYear(null)}
          >
            Present
          </button>
        </div>
        <div className="flex justify-between items-center">
          <button
            className="flex items-center text-sm text-orange-600 dark:text-orange-500"
            onClick={() => setYear(selectedYear ? selectedYear - 1 : currentYear)}
          >
            <ChevronLeft />
            {selectedYear ? (selectedYear - 1).toString() : currentYear.toString()}
          </button>
          <h2 className="text-center text-xl font-semibold dark:text-slate-100">
            {selectedYear ? selectedYear.toString() : "Upcoming Events"}
          </h2>
          <button
            className="flex items-center text-sm text-orange-600 dark:text-orange-500"
            onClick={() => setYear(selectedYear ? selectedYear + 1 : currentYear + 1)}
          >
            {selectedYear ? (selectedYear + 1).toString() : (currentYear + 1).toString()}
            <ChevronRight />
          </button>
        </div>
      </header>
      {listEvents.length > 0 ? (
        <CalendarList events={listEvents} />
      ) : (
        <div className="text-center text-gray-600 dark:text-gray-400 py-8">
          No calendar dates to display
        </div>
      )}
    </div>
  );
}
