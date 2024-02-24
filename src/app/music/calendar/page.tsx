import CalendarPageContent from "@/components/CalendarPageContent";
import { CalendarEvent, getCalendarEvents } from "@/services/gig-calendar";

export default async function CalendarPage() {
  const events = await getCalendarEvents();

  const eventMap = new Map<string, CalendarEvent>();
  for (const event of events) {
    eventMap.set(event.id, event);
  }

  return <CalendarPageContent events={events} eventMap={eventMap} />;
}
