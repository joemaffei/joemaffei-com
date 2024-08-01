"use client";

import { format } from "date-fns";
import { calendar_v3 } from "googleapis";

type CalendarEventTableProps = {
  event: calendar_v3.Schema$Event;
};

export default function CalendarEventTable({ event }: CalendarEventTableProps) {
  // const encodedLocation = encodeURIComponent(event.location);
  // const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;

  const starts = format(new Date(event.start!.dateTime!), "PPpp");
  const ends = format(new Date(event.end!.dateTime!), "PPpp");

  return (
    <table className="grid grid-cols-[min-content_1fr] gap-x-2 gap-y-2 mb-4">
      <tbody className="contents">
        <tr className="contents">
          <th scope="row" className="text-start">
            Starts
          </th>
          <td>{starts}</td>
        </tr>
        <tr className="contents">
          <th scope="row" className="text-start">
            Ends
          </th>
          <td>{ends}</td>
        </tr>
        <tr className="contents">
          <th scope="row" className="text-start align-top">
            Location
          </th>
          <td className="flex flex-col gap-y-4">
            <div>{event.location}</div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
