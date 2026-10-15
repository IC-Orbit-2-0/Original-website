import { NextResponse } from "next/server";
import { MEMBERS } from "@/data/members";

export async function GET() {
  return NextResponse.json({
    success: true,
    club: "IC ORBITE",
    tagline: "INTERESTED. CODE ORBIT",
    members: MEMBERS,
    leadership: MEMBERS,
  });
}
