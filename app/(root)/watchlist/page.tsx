"use client";
import { getNews } from "@/app/api/finnhub.actions";
import WatchListTable from "@/components/WatchListTable";
import axios from "axios";
import { useEffect, useState } from "react";
const page = () => {
  const [stocks, setStocks] = useState("");
  const [open, setOpen] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [news, setNews] = useState<MarketNewsArticle[]>();

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
  console.log("news", news);

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
    <div className="min-w-screen h-full">
      {/* watch list  */}
      <section className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-8 min-w-screen">
        {/* LEFT SIDE — WATCHLIST */}
        <div className="flex flex-col">
          <div className="text-2xl flex items-center justify-center pb-2">
            <h1 className="text-2xl font-mono font-semibold">Watch List</h1>
          </div>

          <div className="border border-gray-600 bg-gray-700 rounded-xl overflow-hidden">
            <WatchListTable />
          </div>
        </div>

        {/* RIGHT SIDE — NEWS + TRADINGVIEW WIDGET */}
        <div className="flex flex-col gap-6">
          {/* TradingView Widget */}

          {/* News Section */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Market News
            </h2>

            <div className="flex flex-col gap-4 max-h-[700px] overflow-y-auto pr-2">
              {news?.map((item) => (
                <a
                  key={item.id + item.source}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 items-start p-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {/* Thumbnail */}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.headline}
                      className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                    />
                  )}

                  {/* Text content */}
                  <div className="flex flex-col">
                    <h3 className="text-sm font-medium text-gray-100 line-clamp-2">
                      {item.headline}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-3 mt-1">
                      {item.summary}
                    </p>
                    <div className="text-[10px] text-gray-500 mt-1 flex justify-between">
                      <span>{item.source}</span>
                      <span>
                        {new Date(item.datetime * 1000).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;

// table to pass the data of fav stocks
// hold buy and sell and update to the backend
// And select unselect and update the backend.
// get the article to show on the side bar.
