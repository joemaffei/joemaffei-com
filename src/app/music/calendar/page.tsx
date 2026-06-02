import CalendarPageContent from "@/components/CalendarPageContent";
import { getCalendarEvents, getCalendarEventsForYear } from "@/services/gig-calendar";
import { calendar_v3 } from "googleapis";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

type CalendarPageProps = {
  searchParams: Promise<{ year?: string }>;
};

export default async function CalendarPage(props: CalendarPageProps) {
  const searchParams = await props.searchParams;
  const yearParam = searchParams.year;
  const selectedYear = yearParam ? parseInt(yearParam, 10) : null;

  let events: calendar_v3.Schema$Event[];

  if (selectedYear && !isNaN(selectedYear)) {
    events = await getCalendarEventsForYear(selectedYear);
  } else {
    events = await getCalendarEvents();
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CalendarPageContent events={events} />
    </Suspense>
  );
}
