import { NextRequest, NextResponse } from "next/server";
import { readJsonFile, writeJsonFile } from "@/lib/storage";

interface EventStoreItem {
  id: string;
  title: string;
  spotsLeft: number;
  registrations: {
    name: string;
    email: string;
    ticketId: string;
    registeredAt: string;
  }[];
}

export async function GET() {
  const events = readJsonFile<EventStoreItem[]>("events-store.json", []);
  return NextResponse.json({
    success: true,
    events,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId, name, email } = body;

    if (!eventId || !name || !email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Event ID, student name, and valid email are required." },
        { status: 400 }
      );
    }

    const events = readJsonFile<EventStoreItem[]>("events-store.json", []);
    const eventIndex = events.findIndex((e) => e.id === eventId);

    if (eventIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Event not found in orbital schedule." },
        { status: 404 }
      );
    }

    const event = events[eventIndex];

    // Check duplicate
    const alreadyRegistered = event.registrations.some(
      (r) => r.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (alreadyRegistered) {
      return NextResponse.json({
        success: true,
        message: "You are already registered for this orbital event!",
        eventTitle: event.title,
      });
    }

    if (event.spotsLeft <= 0) {
      return NextResponse.json(
        { success: false, error: "All orbital spots have been filled for this event." },
        { status: 400 }
      );
    }

    const ticketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    event.spotsLeft = Math.max(0, event.spotsLeft - 1);
    event.registrations.push({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      ticketId,
      registeredAt: new Date().toISOString(),
    });

    writeJsonFile("events-store.json", events);

    return NextResponse.json({
      success: true,
      message: `Successfully reserved your orbital pass for ${event.title}!`,
      ticketId,
      eventTitle: event.title,
      spotsRemaining: event.spotsLeft,
    });
  } catch (err) {
    console.error("API /api/events/register error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to process event registration." },
      { status: 500 }
    );
  }
}
