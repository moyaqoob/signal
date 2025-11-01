"use client";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavItems from "./NavItems";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { Db } from "mongodb";
import { signOut } from "@/app/api/auth.actions";
const UserDropDown = ({user}:{user:User}) => {
  const router = useRouter();
  const handleSignOut = () => {
    router.replace("/Signin");
  };
  const [initialStocks, setInitialStocks] = useState<any[]>([]);
  const initialUser = "fnkdn"

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch("/api/search");
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted) setInitialStocks(Array.isArray(data) ? data : []);
      } catch (e) {
        // swallow - keep dropdown usable even if search fails
        console.error("Failed to load initial stocks", e);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="flex item-center gap-3">
          <Avatar>
            <AvatarImage src={"https://github.com/moyaqoob.png"} alt="Avatar" />

            <AvatarFallback>
              <div className="w-8 h-8 bg-gradient-to-b from-blue-500 via-white to-orange-500"></div>
            </AvatarFallback>
          </Avatar>

          <div className="hidden md:flex flex-col items-start">
            <span>{user.name}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="text-gray-600">
        <DropdownMenuLabel>
          <div className="flex items-center relative gap-3 py-2">
            <Avatar>
              <AvatarImage
                src={"https://github.com/moyaqoob.png"}
                alt="Avatar"
              />

              <AvatarFallback>
                <div className="w-8 h-8 bg-gradient-to-b from-blue-500 via-white to-orange-500"></div>
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-base font-medium text-gray-400">
                {user.name}
              </span>
              <span className="text-sm text-gray-500">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-600 mb-2 w-full h-[1px]" />
        <nav className="md:hidden ">
          <NavItems initialStocks={initialStocks} />
        </nav>
        <DropdownMenuSeparator className="bg-gray-600 mt-3 " />
        <DropdownMenuItem
          onClick={signOut}
          className="text-md text-gray-500   rounded-md hover:text-gray-600 p-0 max-w-fit ml-1 hover:bg-gray-500"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
