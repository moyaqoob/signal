import Image from "next/image";
import Link from "next/link";

const TICKER_DATA = [
  { symbol: "AAPL", price: "189.43", change: "+1.24%" },
  { symbol: "TSLA", price: "242.11", change: "+3.07%" },
  { symbol: "NVDA", price: "871.92", change: "+2.55%" },
  { symbol: "MSFT", price: "415.20", change: "+0.89%" },
  { symbol: "GOOG", price: "177.56", change: "-0.32%" },
  { symbol: "META", price: "521.03", change: "+1.70%" },
  { symbol: "AMZN", price: "192.87", change: "+0.94%" },
  { symbol: "SPY",  price: "532.18", change: "+0.61%" },
  { symbol: "BTC",  price: "67,420", change: "+4.12%" },
  { symbol: "ETH",  price: "3,512",  change: "+2.88%" },
];

const TECH_NEWS = [
  "OpenAI releases GPT-5 with enhanced reasoning capabilities — Wall Street reacts",
  "NVIDIA surpasses $2T market cap as AI chip demand accelerates into Q3",
  "Fed signals rate hold; markets rally on cooling inflation data",
  "Apple Vision Pro 2 leak drives AAPL pre-market surge of 3.2%",
  "Anthropic raises $4B Series E; AI sector valuations hit record highs",
  "SEC approves spot Ethereum ETF; crypto markets see $80B inflow in 48hrs",
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const tickerItems = [...TICKER_DATA, ...TICKER_DATA];
  const newsItems = [...TECH_NEWS, ...TECH_NEWS];

  return (
    <main className="auth-root">

      {/* ─── TICKER TAPE ──────────────────────────────────────────── */}
      <div className="ticker-rail">
        <div className="ticker-track">
          {tickerItems.map((t, i) => (
            <span key={i} className="ticker-item">
              <span className="ticker-symbol">{t.symbol}</span>
              <span className="ticker-price">{t.price}</span>
              <span className={`ticker-change ${t.change.startsWith("+") ? "up" : "down"}`}>
                {t.change}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── MAIN CONTENT ─────────────────────────────────────────── */}
      <div className="auth-body">

        {/* LEFT: Form panel */}
        <section className="auth-panel">
          <Link href="/" className="brand">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="28" height="28" rx="6" fill="#D4F73B"/>
              <polyline points="3,18 8,10 12,15 16,7 20,12 25,6" stroke="#0A0A0A" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
            </svg>
            <span className="brand-name">Signal</span>
            <span className="brand-tag">PRO</span>
          </Link>

          <div className="form-container">
            {children}
          </div>

          <p className="panel-footer">
            Real-time data powered by Signal Engine v3 &nbsp;·&nbsp; Markets update every 250ms
          </p>
        </section>

        {/* RIGHT: Data wall */}
        <section className="auth-wall" aria-hidden="true">

          <div className="wall-grid">
            {/* Top watchlist */}
            <div className="wall-block">
              <p className="block-label">WATCHLIST · LIVE</p>
              <div className="watchlist">
                {TICKER_DATA.slice(0, 6).map((t) => (
                  <div key={t.symbol} className="watch-row">
                    <span className="watch-sym">{t.symbol}</span>
                    <div className="watch-bar-wrap">
                      <div className={`watch-bar ${t.change.startsWith("+") ? "bar-up" : "bar-down"}`}
                           style={{ width: `${40 + Math.random() * 55}%` }} />
                    </div>
                    <span className="watch-price">{t.price}</span>
                    <span className={`watch-delta ${t.change.startsWith("+") ? "up" : "down"}`}>{t.change}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini spark chart area */}
            <div className="wall-block">
              <p className="block-label">S&amp;P 500 · INTRADAY</p>
              <svg viewBox="0 0 260 80" className="spark-chart" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4F73B" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="#D4F73B" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0,60 C20,55 30,40 50,38 S80,50 100,35 S130,20 150,22 S180,30 200,18 S230,10 260,8"
                      fill="none" stroke="#D4F73B" strokeWidth="1.5"/>
                <path d="M0,60 C20,55 30,40 50,38 S80,50 100,35 S130,20 150,22 S180,30 200,18 S230,10 260,8 L260,80 L0,80 Z"
                      fill="url(#sparkGrad)"/>
                <circle cx="260" cy="8" r="3" fill="#D4F73B"/>
              </svg>
              <div className="spark-stats">
                <span className="ss-label">OPEN <span className="ss-val">5,284.10</span></span>
                <span className="ss-label">HIGH <span className="ss-val up">5,347.92</span></span>
                <span className="ss-label">VOL <span className="ss-val">2.4B</span></span>
              </div>
            </div>

            {/* Quote block */}
            <div className="wall-block quote-block">
              <p className="block-label">SIGNAL INTELLIGENCE</p>
              <blockquote className="wall-quote">
                &ldquo;Signal turned my watchlist into a winning list. The alerts are spot-on — I feel more confident making moves in the market.&rdquo;
              </blockquote>
              <div className="quote-attr">
                <div className="quote-avatar">Y</div>
                <div>
                  <p className="qa-name">Yaqoob</p>
                  <p className="qa-role">Retail Investor · Hyderabad</p>
                </div>
                <div className="quote-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#D4F73B">
                      <polygon points="7,1 8.8,5.4 13.5,5.4 9.9,8.5 11.2,13 7,10.3 2.8,13 4.1,8.5 0.5,5.4 5.2,5.4"/>
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Market status pills */}
            <div className="wall-block status-block">
              <div className="status-pill open">
                <span className="status-dot"/>
                NYSE OPEN
              </div>
              <div className="status-pill open">
                <span className="status-dot"/>
                NASDAQ OPEN
              </div>
              <div className="status-pill closed">
                <span className="status-dot"/>
                LSE CLOSED
              </div>
              <div className="status-pill open">
                <span className="status-dot"/>
                CRYPTO 24/7
              </div>
            </div>
          </div>

        </section>
      </div>

      {/* ─── NEWS TAPE ────────────────────────────────────────────── */}
      <div className="news-rail">
        <span className="news-label">TECH &amp; MARKETS</span>
        <div className="news-track">
          {newsItems.map((n, i) => (
            <span key={i} className="news-item">
              <span className="news-bullet">◆</span>
              {n}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        /* ── RESET & ROOT ──────────────────────────────────────── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-root {
          display: flex;
          flex-direction: column;
          height: 100dvh;
          overflow: hidden;
          background: #060606;
          font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
          color: #e8e8e0;
        }

        /* ── TICKER TAPE ───────────────────────────────────────── */
        .ticker-rail {
          flex-shrink: 0;
          height: 32px;
          background: #0e0e0e;
          border-bottom: 1px solid #1e1e1e;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .ticker-track {
          display: flex;
          gap: 0;
          animation: ticker 45s linear infinite;
          white-space: nowrap;
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0 24px;
          border-right: 1px solid #1e1e1e;
          font-size: 11px;
          letter-spacing: 0.04em;
        }
        .ticker-symbol { color: #888; font-weight: 600; }
        .ticker-price  { color: #e8e8e0; }
        .ticker-change.up   { color: #D4F73B; }
        .ticker-change.down { color: #ff4d4d; }

        /* ── BODY ──────────────────────────────────────────────── */
        .auth-body {
          flex: 1;
          display: grid;
          grid-template-columns: 420px 1fr;
          overflow: hidden;
        }

        /* ── LEFT PANEL ────────────────────────────────────────── */
        .auth-panel {
          display: flex;
          flex-direction: column;
          background: #0a0a0a;
          border-right: 1px solid #1a1a1a;
          padding: 28px 36px;
          overflow-y: auto;
        }
        .auth-panel::-webkit-scrollbar { width: 4px; }
        .auth-panel::-webkit-scrollbar-track { background: transparent; }
        .auth-panel::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }

        /* Brand */
        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-bottom: 44px;
        }
        .brand-name {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #f0f0e8;
        }
        .brand-tag {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #0a0a0a;
          background: #D4F73B;
          padding: 2px 5px;
          border-radius: 3px;
        }

        .form-container { flex: 1; }

        /* Form title (injected by child pages) */
        .form-title {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #f0f0e8;
          margin-bottom: 6px;
        }
        .form-subtitle {
          font-size: 12px;
          color: #555;
          letter-spacing: 0.03em;
          margin-bottom: 32px;
        }

        /* Input fields */
        label {
          display: block;
          font-size: 10px;
          letter-spacing: 0.1em;
          color: #555;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        input[type="text"],
        input[type="email"],
        input[type="password"] {
          width: 100%;
          height: 42px;
          background: #111;
          border: 1px solid #1e1e1e;
          border-radius: 4px;
          color: #e8e8e0;
          font-family: inherit;
          font-size: 13px;
          padding: 0 14px;
          outline: none;
          transition: border-color 0.15s, background 0.15s;
        }
        input:focus {
          border-color: #D4F73B;
          background: #0f0f0f;
        }
        input::placeholder { color: #333; }

        /* Select */
        select {
          width: 100%;
          height: 42px;
          background: #111;
          border: 1px solid #1e1e1e;
          border-radius: 4px;
          color: #e8e8e0;
          font-family: inherit;
          font-size: 13px;
          padding: 0 14px;
          outline: none;
          appearance: none;
          cursor: pointer;
          transition: border-color 0.15s;
        }
        select:focus { border-color: #D4F73B; }

        /* Errors */
        .field-error {
          font-size: 10px;
          color: #ff4d4d;
          margin-top: 4px;
          letter-spacing: 0.04em;
        }

        /* Yellow CTA button */
        .yellow-btn {
          height: 44px;
          background: #D4F73B;
          border: none;
          border-radius: 4px;
          color: #0a0a0a;
          font-family: inherit;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
        }
        .yellow-btn:hover:not(:disabled) { background: #c8eb2e; }
        .yellow-btn:active:not(:disabled) { transform: scale(0.99); }
        .yellow-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Footer link */
        .footer-link {
          font-size: 12px;
          color: #444;
          text-align: center;
        }
        .footer-link a {
          color: #D4F73B;
          text-decoration: none;
        }
        .footer-link a:hover { text-decoration: underline; }

        .panel-footer {
          font-size: 10px;
          color: #2a2a2a;
          letter-spacing: 0.03em;
          margin-top: 28px;
          text-align: center;
        }

        /* ── RIGHT WALL ────────────────────────────────────────── */
        .auth-wall {
          background: #060606;
          padding: 28px 32px;
          overflow: hidden;
          position: relative;
        }

        .wall-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 16px;
          height: 100%;
        }

        .wall-block {
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
          border-radius: 6px;
          padding: 16px 18px;
          overflow: hidden;
        }

        .block-label {
          font-size: 9px;
          letter-spacing: 0.14em;
          color: #333;
          margin-bottom: 14px;
          text-transform: uppercase;
        }

        /* Watchlist */
        .watchlist { display: flex; flex-direction: column; gap: 10px; }
        .watch-row {
          display: grid;
          grid-template-columns: 52px 1fr 64px 56px;
          align-items: center;
          gap: 10px;
          font-size: 11px;
        }
        .watch-sym { color: #888; font-weight: 600; letter-spacing: 0.06em; }
        .watch-bar-wrap { height: 4px; background: #141414; border-radius: 2px; overflow: hidden; }
        .watch-bar { height: 100%; border-radius: 2px; transition: width 0.8s ease; }
        .bar-up   { background: #D4F73B; }
        .bar-down { background: #ff4d4d; }
        .watch-price { color: #c0c0b8; text-align: right; font-variant-numeric: tabular-nums; }
        .watch-delta { text-align: right; font-variant-numeric: tabular-nums; }

        /* Spark chart */
        .spark-chart { width: 100%; height: 80px; display: block; margin-bottom: 12px; }
        .spark-stats { display: flex; gap: 20px; }
        .ss-label { font-size: 9px; color: #333; letter-spacing: 0.1em; }
        .ss-val { color: #888; margin-left: 4px; }
        .ss-val.up { color: #D4F73B; }

        /* Quote */
        .quote-block { grid-column: 1 / -1; display: flex; flex-direction: column; gap: 14px; }
        .wall-quote {
          font-size: 14px;
          line-height: 1.7;
          color: #c0c0b8;
          font-style: normal;
          letter-spacing: 0.01em;
          border-left: 2px solid #D4F73B;
          padding-left: 14px;
        }
        .quote-attr { display: flex; align-items: center; gap: 12px; }
        .quote-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #1a1a0f;
          border: 1px solid #D4F73B;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          color: #D4F73B;
          flex-shrink: 0;
        }
        .qa-name { font-size: 12px; font-weight: 600; color: #c0c0b8; }
        .qa-role { font-size: 10px; color: #444; }
        .quote-stars { display: flex; gap: 2px; margin-left: auto; }

        /* Status pills */
        .status-block { display: flex; flex-direction: column; gap: 8px; justify-content: center; }
        .status-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          letter-spacing: 0.1em;
          padding: 6px 10px;
          border-radius: 3px;
          background: #0f0f0f;
          border: 1px solid #1a1a1a;
        }
        .status-pill.open  { color: #D4F73B; }
        .status-pill.closed { color: #333; }
        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          flex-shrink: 0;
          animation: pulse 2s ease-in-out infinite;
        }
        .status-pill.closed .status-dot { animation: none; }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* ── COLOR UTILITIES ───────────────────────────────────── */
        .up   { color: #D4F73B; }
        .down { color: #ff4d4d; }

        /* ── NEWS RAIL ─────────────────────────────────────────── */
        .news-rail {
          flex-shrink: 0;
          height: 30px;
          background: #0d0d0d;
          border-top: 1px solid #1a1a1a;
          display: flex;
          align-items: center;
          overflow: hidden;
          gap: 0;
        }
        .news-label {
          flex-shrink: 0;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #0a0a0a;
          background: #D4F73B;
          padding: 0 10px;
          height: 100%;
          display: flex;
          align-items: center;
        }
        .news-track {
          display: flex;
          gap: 0;
          animation: ticker 80s linear infinite;
          white-space: nowrap;
        }
        .news-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0 32px;
          font-size: 11px;
          color: #555;
          border-right: 1px solid #1a1a1a;
        }
        .news-bullet { color: #333; font-size: 8px; }

        /* ── SPACE UTILS ───────────────────────────────────────── */
        .space-y-5 > * + * { margin-top: 1.25rem; }
        .w-full { width: 100%; }
        .mt-5 { margin-top: 1.25rem; }
        .text-center { text-align: center; }
      `}</style>
    </main>
  );
}
