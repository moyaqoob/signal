// @ts-ignore
"use client";

import { searchStocks } from "@/app/api/finnhub.actions";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { useDebounce } from "@/hooks/useDebounce";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
const SearchCommand = ({
  renderAs = "button",
  label = "Add stock",
  initialStocks,
}: SearchCommandProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [stocks, setstocks] =
    useState<StockWithWatchlistStatus[]>(initialStocks);
  const isSearchMode = !!searchTerm.trim();

  const displayStocks = isSearchMode ? stocks : stocks.slice(0, 5);
  const handleSearch = async () => {
    if (!isSearchMode) return setstocks(initialStocks);
    setLoading(true);
    try {
      const results = await searchStocks(searchTerm.trim());
      console.log("results", results);
      setstocks(results);
    } catch {
      setstocks([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebounce(handleSearch, 300);

  useEffect(() => {
    debouncedSearch();
  }, [searchTerm]);

  const handleSelectStock = () => {
    setOpen(false);
    setSearchTerm("");
    setstocks(initialStocks);
  };
  return (
    <>
      {renderAs === "text" ? (
        <span
          onClick={() => setOpen(true)}
          className="hover:bg-gray-500 hover:text-gray-600 px-1 rounded-md md:rounded-2xl md:p-2 text-gray-500   md:hover:bg-yellow-500 md:hover:text-gray-600 transition-colors cursor-pointer"
        >
          {label}
        </span>
      ) : (
        <Button onClick={() => setOpen(true)}>{label}</Button>
      )}
      {open && (
        <div className="fixed top-20 left-0 right-0 h-full  bg-background/5 backdrop-blur-md z-50" />
      )}

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="max-w-5xl xl:w-4xl bg-gray-500 text-white rounded-xl shadow-lg"
      >
        <CommandInput
          onValueChange={(value) => setSearchTerm(value)}
          placeholder="Search stocks, tickers..."
        />
        <CommandList>
          {loading ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : displayStocks?.length === 0 ? (
            <div className="search-list-indicator">
              {isSearchMode ? "No results found" : "No stocks available"}
            </div>
          ) : (
            <ul>
              <div className="search-count">
                {isSearchMode ? "Search results" : "Popular stocks"}(
                {displayStocks.length || 0})
              </div>
              <div className="search-count">
                {displayStocks?.map((stock, i) => (
                  <li key={i} className="search-item">
                    <Link
                      href={`/stocks/${stock.symbol}`}
                      onClick={handleSelectStock}
                      className="search-item-link"
                    >
                      <TrendingUp className="h-4 w-4 text-gray-200" />
                      <div className="flex-1">
                        <div className="search-item-name text-lg font-semibold">
                          {stock.name}
                        </div>
                        <div className="text-base text-gray-200">
                          {stock.symbol} | {stock.exchange} | {stock.type}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </div>
            </ul>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchCommand;
