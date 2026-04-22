import TradingViewWidget from "@/components/TradingViewWidget";
import WatchlistButton from "@/components/WatchListButton";
import {
  BASELINE_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  SYMBOL_INFO_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
} from "@/lib/config";

export default async function StockDetails({ params }: StockDetailsPageProps) {
  const { symbol } = await params;
  const scriptUrl = "https://s3.tradingview.com/external-embedding/embed-widget-";

  return (
    <div className="page-content">
      {/* Page header */}
      <div className="stock-page-header">
        <div>
          <span className="section-label">Stock Analysis</span>
          <h1 className="stock-symbol-heading">{symbol.toUpperCase()}</h1>
        </div>
        <WatchlistButton
          symbol={symbol.toUpperCase()}
          company={symbol.toUpperCase()}
          isInWatchlist={false}
        />
      </div>

      <div className="stock-layout">
        {/* ── LEFT COLUMN ─────────────────────────── */}
        <div className="flex flex-col gap-5">
          <div className="terminal-card overflow-hidden">
            <TradingViewWidget
              scriptUrl={`${scriptUrl}symbol-info.js`}
              config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
              height={160}
            />
          </div>

          <div className="terminal-card overflow-hidden">
            <div className="terminal-card-header">
              <span className="section-label">Candlestick Chart</span>
            </div>
            <TradingViewWidget
              scriptUrl={`${scriptUrl}advanced-chart.js`}
              config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
              className="custom-chart"
              height={560}
            />
          </div>

          <div className="terminal-card overflow-hidden">
            <div className="terminal-card-header">
              <span className="section-label">Baseline Chart</span>
            </div>
            <TradingViewWidget
              scriptUrl={`${scriptUrl}advanced-chart.js`}
              config={BASELINE_WIDGET_CONFIG(symbol)}
              className="custom-chart"
              height={560}
            />
          </div>
        </div>

        {/* ── RIGHT COLUMN ────────────────────────── */}
        <div className="flex flex-col gap-5">
          <div className="terminal-card overflow-hidden">
            <div className="terminal-card-header">
              <span className="section-label">Technical Analysis</span>
            </div>
            <TradingViewWidget
              scriptUrl={`${scriptUrl}technical-analysis.js`}
              config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
              height={380}
            />
          </div>

          <div className="terminal-card overflow-hidden">
            <div className="terminal-card-header">
              <span className="section-label">Company Profile</span>
            </div>
            <TradingViewWidget
              scriptUrl={`${scriptUrl}symbol-profile.js`}
              config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
              height={440}
              className="font-medium"
            />
          </div>

          <div className="terminal-card overflow-hidden">
            <div className="terminal-card-header">
              <span className="section-label">Financials</span>
            </div>
            <TradingViewWidget
              scriptUrl={`${scriptUrl}financials.js`}
              config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
              height={440}
            />
          </div>
        </div>
      </div>

      <style>{`
        .stock-page-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid #1a1a1a;
        }
        .stock-symbol-heading {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #f0f0e8;
          font-family: var(--font, monospace);
          margin-top: 4px;
        }
        .stock-layout {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 20px;
          align-items: start;
        }
        @media (max-width: 1100px) {
          .stock-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
