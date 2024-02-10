import { getCalendarEventById } from "@/services/gig-calendar";
import { format } from "date-fns";

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

  // const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;

  const starts = format(new Date(event.start), "PPpp");
  const ends = format(new Date(event.end), "PPpp");

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">{event.summary}</h1>
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
