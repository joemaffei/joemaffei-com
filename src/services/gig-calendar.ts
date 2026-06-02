import { calendar_v3, google } from "googleapis";

export function normalizeCalendarEvent(item: calendar_v3.Schema$Event): calendar_v3.Schema$Event {
  if (item.start?.date) {
    // Store without timezone suffix so new Date() always parses as local time,
    // regardless of whether the code runs on a UTC server or the user's browser.
    return {
      ...item,
      start: { dateTime: item.start.date + "T00:00:00" },
      end: { dateTime: item.start.date + "T23:59:59" },
    };
  }
  return item;
}

export async function getCalendarEvents(): Promise<calendar_v3.Schema$Event[]> {
  const serviceAccountBase64 = process.env.GOOGLE_SERVICE_ACCOUNT!;
  const serviceAccountDecoded = atob(serviceAccountBase64);
  const serviceAccount = JSON.parse(serviceAccountDecoded);

  const auth = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
  });

  const calendar = google.calendar({ version: "v3", auth });

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const oneYearFromToday = new Date();
  oneYearFromToday.setFullYear(oneYearFromToday.getFullYear() + 1);

  const eventsListResponse = await calendar.events.list({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    timeMin: oneYearAgo.toISOString(),
    timeMax: oneYearFromToday.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
    maxResults: 2500,
  });

  return (eventsListResponse.data.items || []).map(normalizeCalendarEvent);
}

export async function getCalendarEventsForYear(year: number): Promise<calendar_v3.Schema$Event[]> {
  const serviceAccountBase64 = process.env.GOOGLE_SERVICE_ACCOUNT!;
  const serviceAccountDecoded = atob(serviceAccountBase64);
  const serviceAccount = JSON.parse(serviceAccountDecoded);

  const auth = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
  });

  const calendar = google.calendar({ version: "v3", auth });

  const yearStart = new Date(`${year}-01-01T00:00:00Z`);
  const yearEnd = new Date(`${year + 1}-01-01T00:00:00Z`);

  const eventsListResponse = await calendar.events.list({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    timeMin: yearStart.toISOString(),
    timeMax: yearEnd.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
    maxResults: 2500,
  });

  return (eventsListResponse.data.items || []).map(normalizeCalendarEvent);
}

export async function getCalendarEventById(
  id: string
): Promise<calendar_v3.Schema$Event | undefined> {
  // TODO: use google api to fetch only one event
  const events = await getCalendarEvents();
  const event = events.find((event) => event.id === id);
  return event;
}
