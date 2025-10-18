import TradingViewWidget from "@/components/TradingViewWidget";
import { MARKET_DATA_WIDGET_CONFIG, TOP_STORIES_WIDGET_CONFIG } from "@/lib/config";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
} from "@/utils/constants";
import { useMemo } from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen home-wrapper">
      <section className="grid gap-8 home-section w-full">
        <div className="md:col-span-1 xl:col-span-1 ">
          <TradingViewWidget
            title="Market Overview"
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            height={1000}
          />
        </div>
        <div className="md:col-span-1 xl:col-span-2">
          <TradingViewWidget
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js"
            config={HEATMAP_WIDGET_CONFIG}
            height={1000}
          />
        </div>
      </section>
      <section className="grid gap-8 home-section w-full">
        <div className="md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"
            config={TOP_STORIES_WIDGET_CONFIG}
            height={900}
          />
        </div>
        <div className="md:col-span-1 p-3 xl:col-span-2 ">
          <TradingViewWidget
            title="Today's Top Stocks"
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js"
            config={MARKET_DATA_WIDGET_CONFIG}
            height={1000}
          />
        </div>
      </section>
    </div>
  );
}
