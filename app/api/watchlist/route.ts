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
    const watchlist = await WatchListModel.find({ userId }).lean();

    return NextResponse.json({ success: true, data: watchlist });
  } catch (error) {
    console.error("Watchlist fetch error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();

    const { id } = await req.json(); // ✅ parse body correctly
    if (!id) {
      return NextResponse.json(
        { error: "Missing stock ID" },
        { status: 400 }
      );
    }

    const result = await WatchListModel.deleteOne({ _id: id }); // ✅ await deletion

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Stock not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Stock deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting stock:", err);
    return NextResponse.json(
      { error: "Failed to delete the stock" },
      { status: 500 }
    );
  }
}