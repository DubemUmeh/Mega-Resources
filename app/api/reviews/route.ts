import { NextResponse } from "next/server";
import { getApprovedReviews } from "@/db/actions/reviews";

export async function GET() {
  try {
    const formatted = await getApprovedReviews();
    return NextResponse.json(formatted);
  } catch (error) {
    console.error("GET /api/reviews error:", error);
    return NextResponse.json(
      { error: "Internal server error: " + (error as Error).message },
      { status: 500 },
    );
  }
}
