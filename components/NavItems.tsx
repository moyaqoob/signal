"use client";
import SearchCommand from "@/app/(root)/search/page";
import { NAV_ITEMS } from "@/lib/config";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = ({initialStocks}:{initialStocks:StockWithWatchlistStatus[]}) => {
  const pathName = usePathname();
  const isActive = (path: string) => {
    if (pathName == "/") return pathName == "/";

    return pathName.startsWith(path);
  };
  return (
    <ul className="flex flex-col gap-4 md:flex-row list-none">
      {NAV_ITEMS.map((item) => {
        if (item.href === "/search")
          return (
            <li key={"search-trigger"}>
              <SearchCommand
                renderAs={"text"}
                label="Search"
                initialStocks={initialStocks}
              />
            </li>
          );

        return (
          <li key={item.href}>
            <Link
              href={item.href!}
              className={`hover:bg-gray-500 hover:text-gray-600 px-1 rounded-md md:rounded-2xl md:p-2 text-gray-500   md:hover:bg-yellow-500 md:hover:text-gray-600 transition-colors ${
                isActive(item.href!) ? "text-gray-400" : " "
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
