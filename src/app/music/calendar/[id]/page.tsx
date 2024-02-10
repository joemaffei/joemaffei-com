import CalendarEventTable from "@/components/CalendarEventTable";
import { getCalendarEventById } from "@/services/gig-calendar";

type CalendarEventPageProps = {
  params: {
    id: string;
  };
};

export default async function CalendarEventPage({
  params,
}: CalendarEventPageProps) {
  const event = await getCalendarEventById(params.id);

  if (!event) {
    return <div>Event not found.</div>;
  }

  const encodedLocation = encodeURIComponent(event.location);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">{event.summary}</h1>
      <CalendarEventTable event={event} />
      <iframe
        width="800"
        height="600"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}&q=${encodedLocation}`}
      />
    </div>
  );
}
