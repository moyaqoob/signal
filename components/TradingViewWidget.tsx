"use client";
import useTradingViewWidget from "@/hooks/useTradingViewWidget";
import { memo } from "react";

interface TradingViewWidgetProps {
  title?: string;
  scriptUrl: string;
  config: Record<string, any>;
  height?: number;
  className?: string;
}
function TradingViewWidget({
  title,
  scriptUrl,
  config,
  height,
  className,
}: TradingViewWidgetProps) {
  const containerRef = useTradingViewWidget(scriptUrl, config, height);

  return (
    <div className={`w-full relative`}>
      {title && (
        <div className=" absolute -top-8 left-2  font-semibold text-gray-100 text-2xl  pointer-events-none">
          {title}
        </div>
      )}
      <div
        className={`tradingview-widget-container`}
        ref={containerRef}
        style={{ height: "100%", width: "100%" }}
      >
        <div
          className={`tradingview-widget-container__widget ${className}`}
          style={{
            height,
            width: "100%",
            fontSize: scriptUrl.includes("symbol-profile") ? "16px" : undefined,
            lineHeight: scriptUrl.includes("symbol-profile")
              ? "1.5"
              : undefined,
          }}
        ></div>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
