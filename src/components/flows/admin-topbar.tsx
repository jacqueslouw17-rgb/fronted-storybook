import * as React from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import frontedLogo from "../../fronted-logo.png";

/**
 * Admin Topbar — verbatim from components/dashboard/Topbar.tsx as F1 v6.1 configures it
 * (mutedAvatar, forceFixed, company switcher inline, profile menu "Settings" / "Log out").
 * The company switcher renders its closed trigger; the search popover is not included.
 */
export function AdminTopbar({
  userName = "Joe User",
  company = "Acme Corp",
  fixed = false,
  menuOpen,
}: {
  userName?: string;
  company?: string;
  /** forceFixed in the app: pinned to the top of the viewport. */
  fixed?: boolean;
  /** Force the profile menu open (for documentation). */
  menuOpen?: boolean;
}) {
  const initials = userName.split(" ").map((n) => n[0]).join("").toUpperCase();
  return (
    <header className={cn("top-0 z-50 h-14 sm:h-16 border-b bg-card flex items-center justify-between px-3 sm:px-6 relative", fixed ? "fixed left-0 right-0" : "sticky")}>
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
        <Button variant="ghost" size="icon" className="hover:bg-transparent flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <img data-ds="wordmark" src={frontedLogo} alt="Fronted" className="h-5 sm:h-6 w-auto cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0" />
        <Button variant="outline" role="combobox" aria-expanded={false} className="w-[140px] sm:w-[280px] h-8 sm:h-9 text-xs sm:text-sm bg-background justify-between">
          <span className="truncate">{company}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </div>

      <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
        <DropdownMenu open={menuOpen} modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                <AvatarFallback className="text-xs sm:text-sm text-foreground/80 bg-muted font-medium">{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
