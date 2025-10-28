import NavItems from "@/components/NavItems";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserDropDown from "@/components/UserDropDown";
import Image from "next/image";
import Link from "next/link";
import { searchStocks } from "../api/finnhub.actions";
const Header = async({user}:{user:User}) => {
  const initialStocks = await searchStocks()
  return (
    <div className=" sticky top-0 header ">
      <div className="header-wrapper container">
        <div className="flex items-center">
          <Link href={"/Signin"}>
            <Image
              width={100}
              height={100}
              src={"/images/logo.png"}
              alt="Logo Image"
            />
          </Link>
        </div>
        <nav className="hidden md:block">
          <NavItems initialStocks={initialStocks}/>
        </nav>
        <div className="flex gap-3">
          <UserDropDown/>
        </div>
      </div>
    </div>
  );
};

export default Header;
