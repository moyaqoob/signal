"use client";

import { searchStocks } from "@/app/api/finnhub.actions";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { useDebounce } from "@/hooks/useDebounce";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const SearchCommand = ({
  renderAs = "button",
  label = "Search",
  initialStocks,
}: SearchCommandProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState<StockWithWatchlistStatus[]>(initialStocks);
  const inputRef = useRef<HTMLInputElement>(null);

  const isSearchMode = !!searchTerm.trim();
  const displayStocks = isSearchMode ? stocks : stocks.slice(0, 7);

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSearch = useCallback(async () => {
    if (!isSearchMode) {
      setStocks(initialStocks);
      return;
    }
    setLoading(true);
    try {
      const results = await searchStocks(searchTerm.trim());
      setStocks(results);
    } catch (error) {
      console.error("Error searching stocks:", error);
      setStocks([]);
    } finally {
      setLoading(false);
    }
  }, [isSearchMode, searchTerm, initialStocks]);

  const debouncedSearch = useDebounce(handleSearch, 300);

  useEffect(() => {
    debouncedSearch();
  }, [searchTerm]);

  const handleSelectStock = () => {
    setOpen(false);
    setSearchTerm("");
    setStocks(initialStocks);
  };

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (!val) {
      setSearchTerm("");
      setStocks(initialStocks);
    }
  };

  return (
    <>
      {/* Trigger */}
      {renderAs === "text" ? (
        <button className="search-trigger-text" onClick={() => setOpen(true)}>
          {label}
          <span style={{ marginLeft: "8px", padding: "1px 5px", background: "#111", border: "1px solid #1e1e1e", borderRadius: "3px", fontSize: "8px", color: "#333", letterSpacing: "0.06em" }}>
            ⌘K
          </span>
        </button>
      ) : (
        <button className="btn-accent" onClick={() => setOpen(true)}>
          {label}
        </button>
      )}

      {/* Backdrop */}
      {open && (
        <div
          className="search-backdrop"
          onClick={() => handleOpenChange(false)}
        />
      )}

      {/* Command Dialog */}
      <CommandDialog
        open={open}
        onOpenChange={handleOpenChange}
        className="search-dialog"
      >
        <div style={{ display: "flex", alignItems: "center", padding: "0 16px", borderBottom: "1px solid #1a1a1a" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" style={{ flexShrink: 0, marginRight: "10px" }}>
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <CommandInput
            ref={inputRef}
            onValueChange={(value) => setSearchTerm(value)}
            placeholder="Search tickers, companies..."
            style={{
              background: "transparent",
              border: "none",
              color: "#e8e8e0",
              fontFamily: "var(--font, monospace)",
              fontSize: "13px",
              padding: "14px 0",
              outline: "none",
              flex: 1,
            }}
          />
          <kbd style={{ fontSize: "9px", color: "#333", border: "1px solid #1a1a1a", borderRadius: "3px", padding: "2px 5px", fontFamily: "var(--font, monospace)", flexShrink: 0 }}>
            ESC
          </kbd>
        </div>

        <CommandList>
          {loading ? (
            <div className="search-list-indicator">
              <span style={{ animation: "pulse 1s ease-in-out infinite" }}>SEARCHING...</span>
            </div>
          ) : displayStocks?.length === 0 ? (
            <CommandEmpty>
              <div className="search-list-indicator">
                {isSearchMode ? "No results found" : "No stocks available"}
              </div>
            </CommandEmpty>
          ) : (
            <ul style={{ margin: 0, padding: "4px 0" }}>
              <div className="search-count" style={{ padding: "8px 16px 4px", fontSize: "9px", letterSpacing: "0.14em", color: "#2a2a2a", textTransform: "uppercase" }}>
                {isSearchMode ? `Results for "${searchTerm}"` : "Popular stocks"} · {displayStocks.length}
              </div>
              {displayStocks.map((stock, i) => (
                <li key={i} className="search-item">
                  <Link
                    href={`/stocks/${stock.symbol}`}
                    onClick={handleSelectStock}
                    className="search-item-link"
                  >
                    <div style={{ width: "36px", height: "36px", background: "#111", border: "1px solid #1a1a1a", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: "9px", fontWeight: "700", color: "#D4F73B", letterSpacing: "0.04em" }}>
                        {stock.symbol?.slice(0, 3)}
                      </span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="search-item-name">{stock.name}</div>
                      <div style={{ fontSize: "10px", color: "#444", letterSpacing: "0.06em" }}>
                        {stock.symbol} · {stock.exchange} · {stock.type}
                      </div>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" stroke="#333" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CommandList>

        <style>{`
          .search-dialog {
            background: #0a0a0a !important;
            border: 1px solid #1a1a1a !important;
            border-radius: 8px !important;
            font-family: var(--font, monospace) !important;
            box-shadow: 0 0 0 1px #1a1a1a, 0 24px 80px rgba(0,0,0,0.85) !important;
            max-width: 600px !important;
            overflow: hidden;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}</style>
      </CommandDialog>
    </>
  );
};

export default SearchCommand;
