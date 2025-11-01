"use client";
import TradingViewWidget from "@/components/TradingViewWidget";
import WatchListTable from "@/components/WatchListTable";

import { TOP_STORIES_WIDGET_CONFIG } from "@/lib/config";
import axios from "axios";
import { useEffect, useState } from "react";
const page = () => {
  const [stocks, setStocks] = useState("");

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await axios.post("/api/watchlist");
        setStocks(res.data.data); // assuming your API returns { success, data: [...] }
      
      } catch (err) {
        console.error("Failed to fetch watchlist:", err);
      }
    };
    fetchWatchlist();
  }, []);

  console.log("stocks", stocks);
  return (
    <div className="min-w-screen h-full">
      {/* watch list  */}
      <section className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-8 w-full">
        {/* left side of watch list */}
        <div className="flex flex-col">
          <div className="text-2xl flex items-center justify-between">
            <h1>Watch List</h1>
            <h1>Add Stock</h1>
          </div>
          <div>
            <WatchListTable />
          </div>
        </div>

        {/* right side of watch list */}
        <div className="">
          {/* news 4 widgets */}
          <TradingViewWidget
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-quotes.js"
            config={TOP_STORIES_WIDGET_CONFIG}
            height={1500}
          />
        </div>
      </section>
    </div>
  );
};

export default page;

// watchlist that has
