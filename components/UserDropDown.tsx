"use client";
import { signOut } from "@/app/api/auth.actions";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavItems from "./NavItems";
import { Avatar } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";

const UserDropDown = ({ user }: { user: User }) => {
  const router = useRouter();
  const [initialStocks, setInitialStocks] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch("/api/search");
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted) setInitialStocks(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Failed to load initial stocks", e);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="user-trigger" aria-label="User menu">
          <Avatar className="user-avatar">
            <AvatarImage src="https://github.com/moyaqoob.png" alt="Avatar" />
            <AvatarFallback>
              <span className="user-avatar-fallback">
                {user?.name?.[0]?.toUpperCase() ?? "U"}
              </span>
            </AvatarFallback>
          </Avatar>
          <span className="user-name hidden md:block">{user?.name}</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="hidden md:block">
            <path d="M2 3.5L5 6.5L8 3.5" stroke="#444" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="dropdown-content" align="end" sideOffset={8}>
        {/* User info */}
        <DropdownMenuLabel asChild>
          <div className="dropdown-label-area">
            <div className="flex items-center gap-10px" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Avatar style={{ width: "32px", height: "32px" }}>
                <AvatarImage src="https://github.com/moyaqoob.png" alt="Avatar" />
                <AvatarFallback>
                  <span className="user-avatar-fallback">
                    {user?.name?.[0]?.toUpperCase() ?? "U"}
                  </span>
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="dropdown-user-name">{user?.name}</p>
                <p className="dropdown-user-email">{user?.email}</p>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator style={{ background: "#1a1a1a", height: "1px", margin: "2px 0" }} />

        {/* Mobile nav */}
        <div className="md:hidden" style={{ padding: "8px 0" }}>
          <NavItems initialStocks={initialStocks} />
        </div>

        <DropdownMenuSeparator style={{ background: "#1a1a1a", height: "1px", margin: "2px 0" }} />

        <DropdownMenuItem
          onClick={signOut}
          className="dropdown-logout-item"
          style={{ cursor: "pointer" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>

    
    </DropdownMenu>
  );
};

export default UserDropDown;
