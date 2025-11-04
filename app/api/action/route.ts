import { WatchListModel } from "@/lib/db/models/WatchListModel";
import { connectToDatabase } from "@/lib/db/mongoose";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { id, action } = await req.json();
    console.log("id,action ",id,action)
    if (!id || !action) {
      return NextResponse.json(
        { error: "Missing id or action" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const updatedStock = await WatchListModel.findByIdAndUpdate(
      id,
      { action },
      { new: true }
    );

    if (!updatedStock) {
      return NextResponse.json({ error: "Error Updating the Action" }, { status: 404 });
    }

    return NextResponse.json(updatedStock, { status: 200 });
  } catch (err) {
    console.error("Error updating stock action:", err);
    return NextResponse.json(
      { error: "Failed to update action" },
      { status: 500 }
    );
  }
}
