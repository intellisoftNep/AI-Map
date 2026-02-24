import { NextResponse } from "next/server";
import { getDashboardStats } from "@/lib/data";

export async function GET() {
  const stats = getDashboardStats();
  return NextResponse.json({
    success: true,
    data: stats,
  });
}
