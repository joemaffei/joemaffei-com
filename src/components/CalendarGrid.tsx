"use client";

import { CalendarEvent } from "@/services/gig-calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { HTMLAttributes } from "react";
import useCalendar from "react-use-calendar";

type CalendarGridProps = HTMLAttributes<HTMLDivElement> & {
  events: CalendarEvent[];
  eventMap: Map<string, CalendarEvent>;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CalendarGrid({
  events,
  eventMap,
  ...rootProps
}: CalendarGridProps) {
  const [state, actions] = useCalendar(new Date(), {
    events: events.map((event) => ({
      startDate: new Date(event.start),
      endDate: new Date(event.end),
      note: event.id,
    })),
  });

  const firstDayOfTheActiveMonth = new Date(
    `${state.year}-${(months.indexOf(state.month) + 1)
      .toString()
      .padStart(2, "0")}-01T00:00:00Z`
  );
  const previousMonthYear = getPrevMonthYear(firstDayOfTheActiveMonth);
  const nextMonthYear = getNextMonthYear(firstDayOfTheActiveMonth);

  return (
    <section className="w-full" {...rootProps}>
      <header className="grid grid-cols-[20%_60%_20%] mb-8">
        <div className="flex justify-start">
          <button
            className="flex items-center text-sm text-orange-600 dark:text-orange-500"
            onClick={() => actions.getPrevMonth()}
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
            onClick={() => actions.getNextMonth()}
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
          {state.weeks.map((week, index) => (
            <tr key={index} className="contents">
              {week.map((day) => (
                <td
                  key={day.dayOfMonth}
                  className={[
                    "border-b dark:border-b-slate-800 px-1 min-h-24 overflow-clip text-ellipsis",
                    day.isToday ? "border-orange-500/20 bg-orange-500/10" : "",
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
                          className="inline-block w-full text-start text-sm bg-orange-400 dark:bg-orange-500/95 text-slate-900 px-1 rounded mb-1"
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

const monthYearFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

const getPrevMonthYear = (utcDate: Date | string) => {
  const prevMonth = new Date(utcDate);
  prevMonth.setMonth(prevMonth.getUTCMonth() - 1);
  return monthYearFormat.format(prevMonth);
};

const getNextMonthYear = (utcDate: Date | string) => {
  const nextMonth = new Date(utcDate);
  nextMonth.setMonth(nextMonth.getUTCMonth() + 1);
  return monthYearFormat.format(nextMonth);
};
