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
import { useEffect, useState } from "react";
const WatchListTable = () => {
  const [stocks, setStocks] = useState([]);
  const [action, setAction] = useState();

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

  const handleAction = (id: number, value: string) => {
    console.log(id, value);
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
          {stocks?.map((stock: any, idx: number) => (
            <TableRow key={stock._id}>
                <TableCell>
                        <Image src={"/images/star.png"} alt="star Image" width={20} height={20}/>
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
                  onValueChange={(value) => handleAction(stock._id, value)}
                >
                  <SelectTrigger className="w-[150px] text-white ">
                    <SelectValue
                      placeholder={stock.action}
                      className="text-xl"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-white font-medium w-46 rounded-xl p-2">
                    <SelectItem
                      value="buy"
                      className="h-10 w-full rounded-md transition-colors duration-150 hover:bg-red-700 focus:bg-red-700"
                    >
                      Buy
                    </SelectItem>
                    <SelectItem
                      value="sell"
                      className="h-10 w-full rounded-md transition-colors duration-150 hover:bg-green-700 focus:bg-green-700"
                    >
                      Sell
                    </SelectItem>
                    <SelectItem
                      value="hold"
                      className="h-10 w-full rounded-md transition-colors duration-150 hover:bg-blue-700 focus:bg-blue-700"
                    >
                      Hold
                    </SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                {/* Action: remove or manage - placeholder button */}
                <button
                  className="text-md text-white px-4 py-2  bg-orange-600 rounded-lg"
                  onClick={() => console.log("remove", stock)}
                >
                    Remove
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WatchListTable;

// table to pass the data of fav stocks
// hold buy and sell and update to the backend
// And select unselect and update the backend.
// get the article to show on the side bar.
