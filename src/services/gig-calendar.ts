const gigCalendarUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTXit08rtAM1JP-fScKAXow8VwgXRbGh6_ecF9-mA_uX3u0Icq1-kaW4qpzboTjxwYeMyy19kYJmCPD/pub?gid=0&single=true&output=tsv";

export type CalendarEvent = {
  id: string;
  start: string;
  end: string;
  summary: string;
  location: string;
};

const ONE_HOUR_IN_SECONDS = 3600;

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  let fetchOptions: RequestInit = { cache: "no-store" };
  if (process.env.NODE_ENV === "production") {
    fetchOptions = { next: { revalidate: ONE_HOUR_IN_SECONDS } };
  }
  const response = await fetch(gigCalendarUrl, fetchOptions);
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
