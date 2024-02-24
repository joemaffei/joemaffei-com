"use client";

import { CalendarEvent } from "@/services/gig-calendar";
import Link from "next/link";
import { HTMLAttributes } from "react";

type CalendarListProps = HTMLAttributes<HTMLDivElement> & {
  events: CalendarEvent[];
};

export default function CalendarList({
  events,
  ...rootProps
}: CalendarListProps) {
  return (
    <div
      {...rootProps}
      className="grid grid-cols-2 gap-x-2 gap-y-1 items-center"
    >
      {events.map((event, index) => (
        <div key={event.id} className="contents">
          {index === 0 && (
            <div className="col-span-2 text-center text-xl font-semibold dark:text-slate-100">
              {getMonth(event.start)}
            </div>
          )}
          {index > 0 &&
            getMonth(event.start) !== getMonth(events[index - 1].start) && (
              <div className="col-span-2 text-center text-xl mt-4 font-semibold dark:text-slate-100">
                {getMonth(event.start)}
              </div>
            )}
          <div className="text-end text-sm opacity-70">
            {formatDate(event.start)}
          </div>
          <div>
            <Link
              href={`/music/calendar/${event.id}`}
              className="text-lg font-semibold"
            >
              {event.summary}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

function formatDate(date: Date | string) {
  return Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "2-digit",
  }).format(new Date(date));
}

function getMonth(date: Date | string) {
  return Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
