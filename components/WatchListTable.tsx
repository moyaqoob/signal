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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "./ui/button";
const WatchListTable = () => {
  const [stocks, setStocks] = useState<StockWithData[]>([]);
  console.log("stocks  from watchlist", stocks);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await axios.post("/api/watchlist");
        setStocks(res.data.data); // assuming your API returns { success, data: [...] }
      } catch (err) {
        console.error("Failed to fetch watchlist:", err);
      }
    };
    fetchWatchlist();
  }, []);

  const router = useRouter();
  const handleAction = async (id: string, action: string) => {
    try {
      await axios.patch("/api/action/", {
        id,
        action,
      });

      router.refresh();
    } catch (err) {
      console.error("Error updating the stock");
    }
  };

  const handleDelete = async (id: string, symbol: string) => {
    try {
      const res = await axios.delete(`/api/watchlist/`, {
        data: {
          id: id,
        },
      });
      if (res.status) {
        toast(`${symbol} has been deleted successfully`, {
          position: "bottom-right",
        });
        setStocks((prev) => prev.filter((stocks) => stocks._id !== id));
      }
    } catch (err) {
      console.error("Error deleting the stock");
      throw new Error("Error Deleting the Stock");
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {WATCHLIST_TABLE_HEADER.map((item, id) => (
              <TableHead
                key={id}
                className="w-[120px] text-gray-300 bg-gray-700"
              >
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {!stocks || stocks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9}>
                <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
                  <p className="text-lg font-semibold">No stocks added</p>
                  <p className="text-sm mt-2">
                    Start building your watchlist by adding stocks you want to
                    track.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            stocks?.map((stock: any, idx: number) => (
              <TableRow key={stock._id}>
                <TableCell>
                  <Image
                    src={"/images/star.png"}
                    alt="star Image"
                    width={20}
                    height={20}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {stock.company ?? stock.symbol}
                </TableCell>
                <TableCell>{stock.symbol}</TableCell>
                <TableCell>
                  {typeof stock.price === "number"
                    ? `$${stock.price.toFixed(2)}`
                    : stock.price}
                </TableCell>
                <TableCell>
                  {typeof stock.change === "number"
                    ? stock.change.toFixed(2)
                    : stock.change}
                </TableCell>
                <TableCell>{stock.marketCap ?? "-"}</TableCell>
                <TableCell>{stock.peRatio ?? "-"}</TableCell>
                <TableCell>
                  <Select
                    onValueChange={(value:string) => handleAction(stock._id, value)}
                  >
                    <SelectTrigger className="w-[150px] text-white">
                      <SelectValue
                        placeholder={stock.action}
                        className="text-xl"
                      />
                    </SelectTrigger>

                    <SelectContent className="bg-black text-white font-medium w-46 rounded-xl p-2">
                      {stock.action !== "Buy" && (
                        <SelectItem
                          value="Buy"
                          className="h-10 w-full rounded-md transition-colors duration-150 hover:bg-red-700 focus:bg-red-700"
                        >
                          Buy
                        </SelectItem>
                      )}

                      {stock.action !== "Sell" && (
                        <SelectItem
                          value="Sell"
                          className="h-10 w-full rounded-md transition-colors duration-150 hover:bg-green-700/50 focus:bg-green-700"
                        >
                          Sell
                        </SelectItem>
                      )}

                      {stock.action !== "Hold" && (
                        <SelectItem
                          value="Hold"
                          className="h-10 w-full rounded-md transition-colors duration-150 hover:bg-blue-700 focus:bg-blue-700"
                        >
                          Hold
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete</Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Stock</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete{" "}
                          <span className="font-semibold">{stock.symbol}</span>?
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(stock._id, stock.symbol)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default WatchListTable;

// table to pass the data of fav stocks done
// hold buy and sell and update to the backend pending
// And select unselect and update the backend. pending
// get the article to show on the side bar. pending
