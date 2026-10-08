import { NextRequest, NextResponse } from "next/server";
import { readJsonFile, writeJsonFile } from "@/lib/storage";

interface Application {
  id: string;
  name: string;
  email: string;
  track: string;
  experience: string;
  callsign: string;
  status: string;
  createdAt: string;
}

export async function GET() {
  const apps = readJsonFile<Application[]>("applications.json", []);
  return NextResponse.json({
    success: true,
    totalApplicants: apps.length,
    recentApplications: apps.slice(-5),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, track, experience } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Valid student name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid student email address is required." },
        { status: 400 }
      );
    }

    const apps = readJsonFile<Application[]>("applications.json", []);

    // Check duplicate email
    const existing = apps.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "You have already established an orbital application link!",
        application: existing,
      });
    }

    const callsign = `#ICO-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp: Application = {
      id: `app-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      track: track || "FullStack & Systems",
      experience: experience || "Beginner with strong curiosity",
      callsign,
      status: "APPROVED",
      createdAt: new Date().toISOString(),
    };

    apps.push(newApp);
    writeJsonFile("applications.json", apps);

    return NextResponse.json(
      {
        success: true,
        message: "Orbital link established successfully! Welcome to IC ORBITE.",
        application: newApp,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("API /api/join error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
