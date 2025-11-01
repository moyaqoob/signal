import mongoose, { Document, Schema } from "mongoose";

export interface IWatchList extends Document {
  userId:string;
  company: string;
  symbol: string;
  price: number;
  change: number;
  marketCap: string; // often expressed in "B", "M", etc.
  peRatio: number;
  alert?: string; // optional, e.g. "Above 200"
  action?: string; // optional, e.g. "Buy" | "Sell" | "Hold"
  createdAt?: Date;
  updatedAt?: Date;
}

const WatchListSchema = new Schema<IWatchList>(
  {
    userId: { type: String, required: true },
    company: { type: String, required: true },
    symbol: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    change: { type: Number, required: true },
    marketCap: { type: String, required: true },
    peRatio: { type: Number, required: true },
    alert: { type: String },
    action: { type: String, enum: ["Buy", "Sell", "Hold"], default: "Hold" },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Prevent model overwrite on hot-reload (important in Next.js)
export const WatchListModel =
  mongoose.models.WatchListModel ||
  mongoose.model<IWatchList>("WatchListModel", WatchListSchema);
