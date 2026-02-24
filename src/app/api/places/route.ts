import { NextResponse } from "next/server";
import { samplePlaces } from "@/lib/data";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: samplePlaces,
    count: samplePlaces.length,
  });
}
