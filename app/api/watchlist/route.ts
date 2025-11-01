import { auth } from "@/lib/better-auth/auth"; // adjust if your auth path differs
import { WatchListModel } from "@/lib/db/models/WatchListModel";
import { connectToDatabase } from "@/lib/db/mongoose";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session?.user.id;
    const watchlist = await WatchListModel.find({userId }).lean();

    return NextResponse.json({ success: true, data: watchlist });
  } catch (error) {
    console.error("Watchlist fetch error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
