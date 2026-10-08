import { NextResponse } from "next/server";
import { EXECUTIVE_TEAM } from "@/data/team";

export async function GET() {
  return NextResponse.json({
    success: true,
    club: "IC ORBITE",
    tagline: "INTERESTED. CODE ORBIT",
    leadership: EXECUTIVE_TEAM,
  });
}
