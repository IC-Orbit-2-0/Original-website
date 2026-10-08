import { NextResponse } from "next/server";
import { readJsonFile } from "@/lib/storage";

interface Application {
  id: string;
}

export async function GET() {
  const apps = readJsonFile<Application[]>("applications.json", []);
  const appCount = apps.length;

  return NextResponse.json({
    success: true,
    telemetry: {
      status: "ACTIVE",
      chapter: "01",
      totalMembers: 400 + appCount,
      reposShipped: 120,
      hackathonVictories: 18,
      hoursInCodeOrbit: 15000,
      applicationsReceived: appCount,
      timestamp: new Date().toISOString(),
    },
  });
}
