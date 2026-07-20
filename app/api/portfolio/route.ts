import { NextRequest, NextResponse } from "next/server";
import { getPublishedPortfolio } from "@/db/actions/portfolio";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get("region") ?? undefined;
    const service = searchParams.get("service") ?? undefined;

    const rows = await getPublishedPortfolio({ region, service });
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET /api/portfolio error:", error);
    return NextResponse.json(
      { error: "Internal server error: " + (error as Error).message },
      { status: 500 },
    );
  }
}
