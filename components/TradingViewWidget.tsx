"use client";
import useTradingViewWidget from "@/hooks/useTradingViewWidget";
import { memo } from "react";

interface TradingViewWidgetProps {
  title?: string;
  scriptUrl: string;
  config: Record<string, any>;
  height?: number;
}
function TradingViewWidget({
  title,
  scriptUrl,
  config,
  height,
}: TradingViewWidgetProps) {
  const containerRef = useTradingViewWidget(scriptUrl, config, height);

  return (
    <div className="w-full relative">
      {title && (
        <div className=" absolute -top-8 left-2  font-semibold text-gray-100 text-2xl z-10 pointer-events-none">
          {title}
        </div>
      )}
      <div
        className="tradingview-widget-container"
        ref={containerRef}
        style={{ height: "100%", width: "100%" }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height, width: "100%" }}
        ></div>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
