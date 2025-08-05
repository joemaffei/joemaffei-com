import { getCalendarEventsForYear } from "@/services/gig-calendar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { year: string } }
) {
  try {
    const year = parseInt(params.year, 10);
    
    if (isNaN(year) || year < 1900 || year > 2100) {
      return NextResponse.json({ error: "Invalid year" }, { status: 400 });
    }

    const events = await getCalendarEventsForYear(year);
    return NextResponse.json({ events });
  } catch (error) {
    console.error("Error fetching calendar events for year:", error);
    return NextResponse.json(
      { error: "Failed to fetch calendar events" },
      { status: 500 }
    );
  }
}