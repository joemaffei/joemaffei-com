"use client";

import { getNextMonthDate, getNextMonthLabel, getPrevMonthDate, getPrevMonthLabel } from "@/lib/calendar-nav";
import { toCalendarDayEvent } from "@/lib/calendar-event-mapping";
import { calendar_v3 } from "googleapis";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { HTMLAttributes } from "react";
import useCalendar from "react-use-calendar";

type CalendarGridProps = HTMLAttributes<HTMLDivElement> & {
  events: calendar_v3.Schema$Event[];
  eventMap: Map<string, calendar_v3.Schema$Event>;
};

export default function CalendarGrid({
  events,
  eventMap,
  ...rootProps
}: CalendarGridProps) {
  const [state, actions] = useCalendar(new Date(), {
    events: events.map(toCalendarDayEvent),
  });

  const previousMonthYear = getPrevMonthLabel(state.year, state.month);
  const nextMonthYear = getNextMonthLabel(state.year, state.month);

  return (
    <section className="w-full" {...rootProps}>
      <header className="grid grid-cols-[20%_60%_20%] mb-8">
        <div className="flex justify-start">
          <button
            className="flex items-center text-sm text-orange-600 dark:text-orange-500"
            onClick={() => actions.setDate(getPrevMonthDate(state.year, state.month))}
          >
            <ChevronLeft />
            {previousMonthYear}
          </button>
        </div>
        <h2 className="text-center text-xl font-semibold dark:text-slate-100">
          {state.month} {state.year}
        </h2>
        <div className="flex justify-end">
          <button
            className="flex items-center text-sm text-orange-600 dark:text-orange-500"
            onClick={() => actions.setDate(getNextMonthDate(state.year, state.month))}
          >
            {nextMonthYear}
            <ChevronRight />
          </button>
        </div>
      </header>
      <table className="w-full grid grid-cols-7">
        <thead className="contents">
          <tr className="contents">
            {state.days.map((day) => (
              <th
                key={day}
                className="border-b dark:border-b-slate-800 dark:text-slate-400 text-start px-2"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="contents">
          {state.weeks.filter((week) => week.some((day) => day.isSameMonth)).map((week, index) => (
            <tr key={index} className="contents">
              {week.map((day) => (
                <td
                  key={day.dayOfYear}
                  className={[
                    "border-b dark:border-b-slate-800 px-1 min-h-24 overflow-clip text-ellipsis",
                    day.isToday ? "border-orange-500/20 bg-orange-500/10" : "",
                    !day.isSameMonth && !day.isToday ? "bg-black/10 dark:bg-white/10" : "",
                  ].join(" ")}
                >
                  {day.isToday && (
                    <div className="p-1 rounded-full dark:text-orange-500 font-bold">
                      {day.dayOfMonth.toString().padStart(2, "0")}
                    </div>
                  )}
                  {!day.isToday && (
                    <div className="p-1 rounded-full">
                      {day.dayOfMonth.toString().padStart(2, "0")}
                    </div>
                  )}
                  {day.events.length > 0 &&
                    day.events.map((event, index) => {
                      const fullEvent = eventMap.get(event.note);
                      return (
                        <Link
                          key={index}
                          href={`/music/calendar/${event.note}`}
                          className="inline-block w-full text-start text-sm bg-orange-400 dark:bg-orange-500/95 text-slate-900 dark:text-slate-900! px-1 rounded mb-1"
                        >
                          {fullEvent?.summary}
                        </Link>
                      );
                    })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
