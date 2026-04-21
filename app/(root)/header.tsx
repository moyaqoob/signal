import NavItems from "@/components/NavItems";
import UserDropDown from "@/components/UserDropDown";
import Link from "next/link";
import { searchStocks } from "../api/finnhub.actions";

const Header = async ({ user }: { user: User }) => {
  const initialStocks = await searchStocks();

  return (
    <header className="header">
      <div className="header-wrapper">
        {/* Brand */}
        <Link href="/" className="brand-link" aria-label="Signal Pro Home">
          <svg
            width="26"
            height="26"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect width="28" height="28" rx="6" fill="#D4F73B" />
            <polyline
              points="3,18 8,10 12,15 16,7 20,12 25,6"
              stroke="#0A0A0A"
              strokeWidth="2.2"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span className="brand-wordmark">Signal</span>
          <span className="brand-pro">PRO</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:block">
          <NavItems initialStocks={initialStocks} />
        </nav>

        {/* Right side */}
        <div className="header-right">
          <UserDropDown user={user} />
        </div>
      </div>

    
    </header>
  );
};

export default Header;
