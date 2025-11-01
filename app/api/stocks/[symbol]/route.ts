import { AddFetchStockDetails } from "@/app/api/finnhub.actions";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { symbol: string } }
) {
  const { symbol } = params;
 console.log("symbol",symbol)
  try {
    const profile = await AddFetchStockDetails(symbol);

    // Sanitize MongoDB doc for JSON serialization
    const safeProfile = JSON.parse(JSON.stringify(profile));

    return NextResponse.json(safeProfile, { status: 200 });
  } catch (err) {
    console.error("Error in AddFetchStockDetails:", err);
    return NextResponse.json(
      { error: "Failed to fetch stock details" },
      { status: 500 }
    );
  }
}
