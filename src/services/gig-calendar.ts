const gigCalendarUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTXit08rtAM1JP-fScKAXow8VwgXRbGh6_ecF9-mA_uX3u0Icq1-kaW4qpzboTjxwYeMyy19kYJmCPD/pub?gid=0&single=true&output=tsv";

export type CalendarEvent = {
  id: string;
  start: string;
  end: string;
  summary: string;
  location: string;
};

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const response = await fetch(gigCalendarUrl, { next: { revalidate: 60 } });
  const text = await response.text();
  const events = text.split(/\r?\n/).map((line) => {
    const [id, start, end, summary, location] = line.split(/\t/);
    return {
      id,
      start,
      end,
      summary,
      location,
    };
  });
  return events;
}

export async function getCalendarEventById(
  id: string
): Promise<CalendarEvent | undefined> {
  const events = await getCalendarEvents();
  const event = events.find((event) => event.id === id);
  return event;
}
