import { NextResponse } from "next/server";
import { sampleProjects } from "@/lib/data";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: sampleProjects,
    count: sampleProjects.length,
  });
}
