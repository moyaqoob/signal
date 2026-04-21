import TradingViewWidget from "@/components/TradingViewWidget";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
} from "@/lib/config";

export default function Home() {
  return (
    <div className="home-wrapper flex gap-5">
      {/* ── LEFT COLUMN ───────────────────────────── */}
      <section className="flex flex-col gap-5 flex-1 min-w-0">
        <div className="terminal-card overflow-hidden">
          <div className="terminal-card-header">
            <span className="section-label">Market Overview</span>
            <span className="status-pill-live">
              <span className="status-dot" style={{ color: "#D4F73B" }} />
              LIVE
            </span>
          </div>
          <TradingViewWidget
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            height={660}
          />
        </div>

        <div className="terminal-card overflow-hidden">
          <div className="terminal-card-header">
            <span className="section-label">Sector Heatmap</span>
          </div>
          <TradingViewWidget
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js"
            config={HEATMAP_WIDGET_CONFIG}
            height={500}
          />
        </div>
      </section>

      {/* ── RIGHT COLUMN ──────────────────────────── */}
      <section className="flex flex-col gap-5" style={{ width: "420px", flexShrink: 0 }}>
        <div className="terminal-card overflow-hidden">
          <div className="terminal-card-header">
            <span className="section-label">Top Stories</span>
          </div>
          <TradingViewWidget
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"
            config={TOP_STORIES_WIDGET_CONFIG}
            height={580}
          />
        </div>

        <div className="terminal-card overflow-hidden">
          <div className="terminal-card-header">
            <span className="section-label">Today's Top Stocks</span>
          </div>
          <TradingViewWidget
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js"
            config={MARKET_DATA_WIDGET_CONFIG}
            height={580}
          />
        </div>
      </section>

      <style>{`
        .status-pill-live {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #D4F73B;
          text-transform: uppercase;
        }
        .home-wrapper {
          padding: 20px 24px;
          max-width: 1600px;
          margin: 0 auto;
          width: 100%;
        }
        @media (max-width: 1100px) {
          .home-wrapper { flex-direction: column; }
          .home-wrapper section:last-child { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}
