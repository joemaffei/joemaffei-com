import CalendarPageContent from "@/components/CalendarPageContent";
import { getCalendarEvents, getCalendarEventsForYear } from "@/services/gig-calendar";
import { calendar_v3 } from "googleapis";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

type CalendarPageProps = {
  searchParams: Promise<{ year?: string; mode?: string }>;
};

export default async function CalendarPage(props: CalendarPageProps) {
  const searchParams = await props.searchParams;
  const yearParam = searchParams.year;
  const selectedYear = yearParam ? parseInt(yearParam, 10) : null;

  let events: calendar_v3.Schema$Event[];
  
  if (selectedYear && !isNaN(selectedYear)) {
    // Fetch events for the specific year
    events = await getCalendarEventsForYear(selectedYear);
  } else {
    // Fetch default events (current range)
    events = await getCalendarEvents();
  }

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
