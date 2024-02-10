import Calendar from "@/components/Calendar";
import { CalendarEvent, getCalendarEvents } from "@/services/gig-calendar";

export default async function CalendarPage() {
  const events = await getCalendarEvents();

  const eventMap = new Map<string, CalendarEvent>();
  for (const event of events) {
    eventMap.set(event.id, event);
  }

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <div></div>
      </header>
      <Calendar events={events} eventMap={eventMap} />
    </div>
  );
}
