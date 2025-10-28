// @ts-ignore
"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { searchStocks } from "@/app/api/finnhub.actions";
import { useDebounce } from "@/hooks/useDebounce";
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
          className="cursor-pointer text-gray-600 hover:text-yellow-500 transition-colors"
        >
          {label}
        </span>
      ) : (
        <Button onClick={() => setOpen(true)}>{label}</Button>
      )}

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search stocks, tickers..." />
        <CommandList>
          {loading ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : displayStocks?.length === 0 ? (
            <div className="search-list-indicator">
              {isSearchMode ? "No results found" : "No stocks available"}
            </div>
          ) : (
            <ul className="search-count">
              {isSearchMode ? "Search results" : "Popular stocks"}(
              {displayStocks.length || 0})
            </ul>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchCommand;
