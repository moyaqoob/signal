"use client";
import { getNews } from "@/app/api/finnhub.actions";
import NewsModal from "@/components/NewsModal";
import TradingViewWidget from "@/components/TradingViewWidget";
import WatchListTable from "@/components/WatchListTable";
import { TOP_STORIES_WIDGET_CONFIG } from "@/lib/config";
import { useEffect, useState } from "react";

const WatchlistPage = () => {
  const [news, setNews] = useState<MarketNewsArticle[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        setNews(data);
      } catch (err) {
        console.error("Error fetching the news", err);
      } finally {
        setNewsLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="page-content" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* ── TOP SECTION ─────────────────────────────── */}
      <div className="watchlist-layout">
        {/* Table */}
        <div className="flex flex-col gap-3">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingBottom: "4px" }}>
            <h1 className="page-heading">Watchlist</h1>
            <span className="status-pill-live">
              <span className="status-dot" style={{ color: "#D4F73B" }} />
              LIVE
            </span>
          </div>
          <WatchListTable />
        </div>

        {/* TradingView Timeline */}
        <div className="terminal-card overflow-hidden">
          <div className="terminal-card-header">
            <span className="section-label">Market News</span>
          </div>
          <TradingViewWidget
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"
            config={TOP_STORIES_WIDGET_CONFIG}
            height={700}
          />
        </div>
      </div>

      {/* ── NEWS STRIP ──────────────────────────────── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <span className="section-label">Latest Intelligence</span>
          {newsLoading && (
            <span style={{ fontSize: "9px", color: "#333", letterSpacing: "0.1em" }}>LOADING...</span>
          )}
        </div>
        <div className="news-strip">
          {news.length === 0 && !newsLoading
            ? (
              <p style={{ fontSize: "11px", color: "#333", padding: "20px 0" }}>No news available.</p>
            )
            : news.map((item) => (
              <NewsModal
                key={item.id}
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

      <style>{`
        .watchlist-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 20px;
          align-items: start;
        }
        @media (max-width: 1000px) {
          .watchlist-layout { grid-template-columns: 1fr; }
        }
        .page-heading {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #e8e8e0;
          font-family: var(--font, monospace);
        }
        .status-pill-live {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #D4F73B;
          text-transform: uppercase;
          font-family: var(--font, monospace);
        }
        .news-strip {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 8px;
        }
        .news-strip::-webkit-scrollbar { height: 3px; }
        .news-strip::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 2px; }
      `}</style>
    </div>
  );
};

export default WatchlistPage;
