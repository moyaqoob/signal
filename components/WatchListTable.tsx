import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WATCHLIST_TABLE_HEADER } from "@/lib/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ACTION_COLORS: Record<string, string> = {
  Buy:  "#D4F73B",
  Sell: "#ff4d4d",
  Hold: "#60a5fa",
};

const WatchListTable = () => {
  const [stocks, setStocks] = useState<StockWithData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await axios.post("/api/watchlist");
        setStocks(res.data.data);
      } catch (err) {
        console.error("Failed to fetch watchlist:", err);
      }
    };
    fetchWatchlist();
  }, []);

  const handleAction = async (id: string, action: string) => {
    // Optimistic update
    setStocks((prev) =>
      prev.map((s) => (s._id === id ? { ...s, action } : s))
    );
    try {
      await axios.patch("/api/action/", { id, action });
    } catch (err) {
      console.error("Error updating the stock");
      router.refresh();
    }
  };

  const handleDelete = async (id: string, symbol: string) => {
    try {
      const res = await axios.delete("/api/watchlist/", { data: { id } });
      if (res.status) {
        toast(`${symbol} removed`, { position: "bottom-right" });
        setStocks((prev) => prev.filter((s) => s._id !== id));
      }
    } catch (err) {
      console.error("Error deleting the stock");
    }
  };

  const formatPrice = (price: unknown) =>
    typeof price === "number" ? `$${price.toFixed(2)}` : (price as string) ?? "—";

  const formatChange = (change: unknown) => {
    if (typeof change !== "number") return (change as string) ?? "—";
    const isUp = change >= 0;
    return {
      text: `${isUp ? "+" : ""}${change.toFixed(2)}%`,
      up: isUp,
    };
  };

  return (
    <div className="watchlist-wrapper">
      <Table>
        <TableHeader>
          <TableRow className="watchlist-header-row hover:bg-transparent">
            {WATCHLIST_TABLE_HEADER.map((item, id) => (
              <TableHead key={id} className="watchlist-header-cell">
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {!stocks || stocks.length === 0 ? (
            <TableRow className="hover:bg-transparent border-none">
              <TableCell colSpan={9} className="watchlist-cell p-0">
                <div className="watchlist-empty">
                  {/* Terminal-style empty state icon */}
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ marginBottom: "8px" }}>
                    <rect x="1" y="1" width="30" height="30" rx="4" stroke="#222" strokeWidth="1"/>
                    <path d="M8 16h16M16 8v16" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <p className="watchlist-empty-title">Watchlist is empty</p>
                  <p className="watchlist-empty-sub">
                    Search for stocks and add them to track performance and set actions.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            stocks.map((stock: any) => {
              const change = formatChange(stock.change);
              const changeText = typeof change === "object" ? change.text : change;
              const changeUp = typeof change === "object" ? change.up : null;

              return (
                <TableRow key={stock._id} className="watchlist-row">
                  {/* Star */}
                  <TableCell className="watchlist-cell" style={{ width: "40px" }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="#D4F73B">
                      <polygon points="7,1 8.8,5.4 13.5,5.4 9.9,8.5 11.2,13 7,10.3 2.8,13 4.1,8.5 0.5,5.4 5.2,5.4"/>
                    </svg>
                  </TableCell>

                  {/* Company */}
                  <TableCell className="watchlist-cell">
                    <span className="watchlist-company">{stock.company ?? stock.symbol}</span>
                  </TableCell>

                  {/* Symbol */}
                  <TableCell className="watchlist-cell">
                    <span className="watchlist-symbol">{stock.symbol}</span>
                  </TableCell>

                  {/* Price */}
                  <TableCell className="watchlist-cell tabnum">
                    {formatPrice(stock.price)}
                  </TableCell>

                  {/* Change */}
                  <TableCell className="watchlist-cell tabnum">
                    <span className={changeUp === true ? "clr-up" : changeUp === false ? "clr-down" : "clr-muted"}>
                      {changeText}
                    </span>
                  </TableCell>

                  {/* Market Cap */}
                  <TableCell className="watchlist-cell clr-muted">
                    {stock.marketCap ?? "—"}
                  </TableCell>

                  {/* P/E */}
                  <TableCell className="watchlist-cell clr-muted">
                    {stock.peRatio ?? "—"}
                  </TableCell>

                  {/* Action Select */}
                  <TableCell className="watchlist-cell">
                    <Select
                      defaultValue={stock.action}
                      onValueChange={(value: string) => handleAction(stock._id, value)}
                    >
                      <SelectTrigger
                        className="action-select-trigger"
                        data-action={stock.action}
                        style={{
                          color: ACTION_COLORS[stock.action] ?? "#888",
                          borderColor: `${ACTION_COLORS[stock.action] ?? "#1a1a1a"}33`,
                          height: "28px",
                          minWidth: "80px",
                          background: "#111",
                          border: `1px solid ${ACTION_COLORS[stock.action] ?? "#1a1a1a"}33`,
                          borderRadius: "3px",
                          fontFamily: "var(--font, monospace)",
                          fontSize: "10px",
                          fontWeight: "700",
                          letterSpacing: "0.1em",
                          padding: "0 10px",
                          cursor: "pointer",
                        }}
                      >
                        <SelectValue placeholder={stock.action} />
                      </SelectTrigger>

                      <SelectContent
                        style={{
                          background: "#0a0a0a",
                          border: "1px solid #1a1a1a",
                          borderRadius: "6px",
                          fontFamily: "var(--font, monospace)",
                          padding: "4px",
                        }}
                      >
                        {stock.action !== "Buy" && (
                          <SelectItem
                            value="Buy"
                            style={{ color: "#D4F73B", fontSize: "11px", fontWeight: "700", letterSpacing: "0.08em", cursor: "pointer" }}
                          >
                            BUY
                          </SelectItem>
                        )}
                        {stock.action !== "Sell" && (
                          <SelectItem
                            value="Sell"
                            style={{ color: "#ff4d4d", fontSize: "11px", fontWeight: "700", letterSpacing: "0.08em", cursor: "pointer" }}
                          >
                            SELL
                          </SelectItem>
                        )}
                        {stock.action !== "Hold" && (
                          <SelectItem
                            value="Hold"
                            style={{ color: "#60a5fa", fontSize: "11px", fontWeight: "700", letterSpacing: "0.08em", cursor: "pointer" }}
                          >
                            HOLD
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  {/* Delete */}
                  <TableCell className="watchlist-cell">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="btn-danger">DEL</button>
                      </AlertDialogTrigger>

                      <AlertDialogContent
                        style={{
                          background: "#0a0a0a",
                          border: "1px solid #1a1a1a",
                          borderRadius: "6px",
                          fontFamily: "var(--font, monospace)",
                        }}
                      >
                        <AlertDialogHeader>
                          <AlertDialogTitle style={{ color: "#e8e8e0", fontSize: "14px", fontWeight: "700", letterSpacing: "-0.02em" }}>
                            Remove from Watchlist
                          </AlertDialogTitle>
                          <AlertDialogDescription style={{ color: "#555", fontSize: "12px", lineHeight: "1.6" }}>
                            Remove{" "}
                            <span style={{ color: "#D4F73B", fontWeight: "700" }}>{stock.symbol}</span>
                            {" "}from your watchlist? This cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter style={{ gap: "8px" }}>
                          <AlertDialogCancel
                            style={{
                              background: "transparent",
                              border: "1px solid #1a1a1a",
                              borderRadius: "3px",
                              color: "#555",
                              fontFamily: "var(--font, monospace)",
                              fontSize: "10px",
                              fontWeight: "700",
                              letterSpacing: "0.1em",
                              padding: "6px 14px",
                              cursor: "pointer",
                            }}
                          >
                            CANCEL
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(stock._id, stock.symbol)}
                            style={{
                              background: "rgba(255,77,77,0.1)",
                              border: "1px solid rgba(255,77,77,0.4)",
                              borderRadius: "3px",
                              color: "#ff4d4d",
                              fontFamily: "var(--font, monospace)",
                              fontSize: "10px",
                              fontWeight: "700",
                              letterSpacing: "0.1em",
                              padding: "6px 14px",
                              cursor: "pointer",
                            }}
                          >
                            REMOVE
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default WatchListTable;
