"use client";
import { getNews } from "@/app/api/finnhub.actions";
import NewsModal from "@/components/NewsModal";
import TradingViewWidget from "@/components/TradingViewWidget";
import WatchListTable from "@/components/WatchListTable";
import { TOP_STORIES_WIDGET_CONFIG } from "@/lib/config";
import axios from "axios";
import { useEffect, useState } from "react";
const page = () => {
  const [stocks, setStocks] = useState("");
  const [open, setOpen] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [news, setNews] = useState<MarketNewsArticle[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        setNews(data);
      } catch (err) {
        console.error("Error fetching the news", err);
      }
    };

    fetchNews();
  }, [symbol]);

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

  return (
    <div className=" ">
      <section className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-8 scroll-">
        <div className="flex flex-col">
          <div className="text-2xl flex items-center justify-center pb-2">
            <h1 className="text-2xl font-mono font-semibold">Watch List</h1>
          </div>

          <div className="border border-gray-600 bg-gray-700 rounded-xl max-h-2/3 overflow-hidden">
            <WatchListTable />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="border border-gray-700 rounded-xl overflow-hidden ">
            <TradingViewWidget
              scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"
              config={TOP_STORIES_WIDGET_CONFIG}
              height={900}
              className="overflow-hidden"
            />
          </div>
        </div>
      </section>
        <div className="flex flex-col sm:flex-row min-w-full gap-3 pt-10">
          {news?.map((item) => (
            <NewsModal
              key={item.summary}
              id={item.id}
              headline={item.headline}
              summary={item.summary}
              source={item.source}
              url={item.url}
              datetime={item.datetime}
              category={item.category}
              related={item.related}
            />
          ))}
        </div>
    </div>
  );
};

export default page;

// table to pass the data of fav stocks
// hold buy and sell and update to the backend
// And select unselect and update the backend.
// get the article to show on the side bar.
