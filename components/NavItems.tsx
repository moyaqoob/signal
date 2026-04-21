"use client";
import SearchCommand from "@/app/(root)/search/page";
import { NAV_ITEMS } from "@/lib/config";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = ({ initialStocks }: { initialStocks: StockWithWatchlistStatus[] }) => {
  const pathName = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathName === "/";
    return pathName.startsWith(path);
  };

  return (
    <ul className="nav-list">
      {NAV_ITEMS.map((item) => {
        if (item.href === "/search") {
          return (
            <li key="search-trigger">
              <SearchCommand
                renderAs="text"
                label="Search"
                initialStocks={initialStocks}
              />
            </li>
          );
        }

        return (
          <li key={item.href}>
            <Link
              href={item.href!}
              className={`nav-link ${isActive(item.href!) ? "active" : ""}`}
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
