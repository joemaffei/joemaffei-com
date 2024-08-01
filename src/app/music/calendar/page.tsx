import CalendarPageContent from "@/components/CalendarPageContent";
import { getCalendarEvents } from "@/services/gig-calendar";
import { calendar_v3 } from "googleapis";
import { Suspense } from "react";

export default async function CalendarPage() {
  const events = await getCalendarEvents();

  const eventMap = new Map<string, calendar_v3.Schema$Event>();
  for (const event of events) {
    eventMap.set(event.id!, event);
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CalendarPageContent events={events} eventMap={eventMap} />
    </Suspense>
  );
}
