"use client";

import { CalendarEvent } from "@/services/gig-calendar";
import useCalendar from "react-use-calendar";

type CalendarProps = {
  events: CalendarEvent[];
  eventMap: Map<string, CalendarEvent>;
};

export default function Calendar({ events, eventMap }: CalendarProps) {
  const [state, actions] = useCalendar(new Date(), {
    events: events.map((event) => ({
      startDate: new Date(event.start),
      endDate: new Date(event.end),
      note: event.id,
    })),
  });

  return (
    <section className="w-full">
      <header className="grid grid-cols-[20%_60%_20%] mb-8">
        <div className="text-start">
          <button
            className="text-sm text-slate-300"
            onClick={() => actions.getPrevMonth()}
          >
            &lt; previous
          </button>
        </div>
        <h2 className="text-center text-xl font-semibold">
          {state.month} {state.year}
        </h2>
        <div className="text-end">
          <button
            className="text-sm text-slate-300"
            onClick={() => actions.getNextMonth()}
          >
            next &gt;
          </button>
        </div>
      </header>
      <table className="w-full grid grid-cols-7">
        <thead className="contents">
          <tr className="contents">
            {state.days.map((day) => (
              <th
                key={day}
                className="border-b border-b-slate-800 text-slate-400 text-start px-2"
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
                    "border-b border-b-slate-800 px-1 min-h-24 overflow-clip text-ellipsis",
                    day.isToday ? "border-orange-500/20 bg-orange-500/10" : "",
                  ].join(" ")}
                >
                  {day.isToday && (
                    <div className="p-1 rounded-full text-orange-500 font-bold">
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
                        <a
                          key={index}
                          href={`/music/calendar/${event.note}`}
                          className="inline-block w-full text-start text-sm bg-orange-500/95 text-slate-900 px-1 rounded mb-1"
                        >
                          {fullEvent?.summary}
                        </a>
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
