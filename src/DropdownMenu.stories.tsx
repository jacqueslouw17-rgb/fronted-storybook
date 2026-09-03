import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Settings, Copy, Trash2 } from "lucide-react";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { Guidance } from "./guidance";
import "./tokens.css";
import "./typography.css";

/**
 * Components — Dropdown Menu (Radix, verbatim ui/dropdown-menu).
 * The kebab / actions menu. Content min-width tracks the number of items
 * (min-w-[140px]–[200px] in the flows). Destructive items use text-destructive.
 */
const meta: Meta = { title: "Components/Dropdown Menu", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

export const DropdownMenuStory: Story = {
  name: "Dropdown Menu",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Dropdown Menu"
        lead={<>
        The kebab / actions menu. Click the trigger to open. Items are text-sm rows that tint on hover/focus; a
        destructive item is coloured and separated. All classes verbatim from ui/dropdown-menu.
        </>}
      />

      <h3 style={eyebrow}>Live example</h3>
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-[200px]">
          <DropdownMenuLabel>Worker</DropdownMenuLabel>
          <DropdownMenuItem><Settings className="mr-2 h-3.5 w-3.5" /> Configure</DropdownMenuItem>
          <DropdownMenuItem><Copy className="mr-2 h-3.5 w-3.5" /> Duplicate</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive"><Trash2 className="mr-2 h-3.5 w-3.5" /> Remove</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <h3 style={eyebrow}>Anatomy &amp; item states</h3>
      <DocTable head={["Part / state", "Example", "classes"]} w0={150} wLast={340} rows={[
        ["Trigger (kebab)", <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>, "ghost icon h-7 w-7 · MoreHorizontal h-4"],
        ["Content", <span style={note}>portalled panel</span>, "min-w-[140–200px] rounded-md border bg-popover p-1 text-popover-foreground shadow-md · fade+zoom on open"],
        ["Label", <div className="w-[200px] rounded-md border bg-popover p-1"><div className="px-2 py-1.5 text-sm font-semibold">Worker</div></div>, "px-2 py-1.5 text-sm font-semibold"],
        ["Item (default)", <div className="w-[200px] rounded-md border bg-popover p-1"><div className="flex items-center rounded-sm px-2 py-1.5 text-sm"><Settings className="mr-2 h-3.5 w-3.5" />Configure</div></div>, "rounded-sm px-2 py-1.5 text-sm · icon mr-2 h-3.5"],
        ["Item (focus / hover)", <div className="w-[200px] rounded-md border bg-popover p-1"><div className="flex items-center rounded-sm px-2 py-1.5 text-sm bg-primary/5"><Copy className="mr-2 h-3.5 w-3.5" />Duplicate</div></div>, "hover:bg-primary/5 focus:bg-primary/5"],
        ["Item (destructive)", <div className="w-[200px] rounded-md border bg-popover p-1"><div className="flex items-center rounded-sm px-2 py-1.5 text-sm text-destructive"><Trash2 className="mr-2 h-3.5 w-3.5" />Remove</div></div>, "text-destructive focus:text-destructive"],
        ["Separator", <div className="w-[200px] rounded-md border bg-popover p-1"><div className="-mx-1 my-1 h-px bg-muted" /></div>, "-mx-1 my-1 h-px bg-muted"],
      ]} />
      <Guidance k="dropdown" />
    </div>
  ),
};
