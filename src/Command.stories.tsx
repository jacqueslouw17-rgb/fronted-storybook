import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { Guidance } from "./guidance";
import "./tokens.css";
import "./typography.css";

/**
 * Components — Command (cmdk, verbatim ui/command).
 * The searchable list — country / nationality pickers in the flows. Almost always
 * inside a Popover as a combobox: CommandInput (h-10) + CommandList (max-h-[200px])
 * with a Check that fades in on the selected CommandItem.
 */
const meta: Meta = { title: "Components/Command", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const NATIONALITIES = ["🇳🇴 Norwegian", "🇵🇭 Filipino", "🇮🇳 Indian", "🇬🇧 British", "🇩🇪 German", "🇸🇬 Singaporean"];

function NationalityCombobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className="group w-[280px] max-w-full h-10 justify-between text-sm font-normal border-input hover:bg-background hover:text-foreground hover:shadow-none hover:translate-y-0">
          {value || <span className="text-muted-foreground group-hover:text-foreground transition-colors">Select nationality</span>}
          <ChevronDown className="ml-2 h-3.5 w-3.5 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search nationality..." className="h-10" />
          <CommandList className="max-h-[200px]">
            <CommandEmpty>No nationality found.</CommandEmpty>
            <CommandGroup>
              {NATIONALITIES.map((n) => (
                <CommandItem key={n} value={n} onSelect={() => { setValue(n); setOpen(false); }}>
                  <Check className={cn("mr-2 h-3.5 w-3.5", value === n ? "opacity-100" : "opacity-0")} />
                  {n}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export const CommandStory: Story = {
  name: "Command",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Command (searchable list)"
        lead={<>
        The searchable picker — used for country / nationality selection. Click to open, type to filter; the
        chosen row shows a check. Verbatim from the Add Candidate drawer.
        </>}
      />

      <h3 style={eyebrow}>Live example — combobox (Popover + Command)</h3>
      <NationalityCombobox />

      <h3 style={eyebrow}>Anatomy &amp; item states</h3>
      <DocTable head={["Part / state", "Example", "classes"]} w0={150} wLast={330} rows={[
        ["Trigger", <Button variant="outline" role="combobox" className="group w-[220px] max-w-full h-10 justify-between text-sm font-normal border-input"><span className="text-muted-foreground">Select nationality</span><ChevronDown className="ml-2 h-3.5 w-3.5 shrink-0 opacity-50" /></Button>, "outline h-10 justify-between · hover matches Select (placeholder muted→foreground, no fill)"],
        ["Input", <div className="w-[240px] max-w-full rounded-md border bg-popover"><div className="flex items-center border-b px-3"><Search className="mr-2 h-4 w-4 shrink-0 opacity-50" /><span className="h-10 flex items-center text-sm text-muted-foreground">Search…</span></div></div>, "CommandInput h-10 · flex items-center border-b px-3 · Search icon opacity-50"],
        ["Item (default)", <div className="w-[240px] max-w-full rounded-md border bg-popover p-1"><div className="flex items-center rounded-sm px-2 py-1.5 text-sm"><Check className="mr-2 h-3.5 w-3.5 opacity-0" />🇩🇪 German</div></div>, "px-2 py-1.5 text-sm · Check mr-2 h-3.5 opacity-0"],
        ["Item (selected)", <div className="w-[240px] max-w-full rounded-md border bg-popover p-1"><div className="flex items-center rounded-sm px-2 py-1.5 text-sm bg-primary/5 text-foreground"><Check className="mr-2 h-3.5 w-3.5 opacity-100" />🇳🇴 Norwegian</div></div>, "data-[selected=true]:bg-primary/5 text-foreground · Check opacity-100"],
        ["Empty", <div className="w-[240px] max-w-full rounded-md border bg-popover"><div className="py-6 text-center text-sm text-muted-foreground">No country found.</div></div>, "CommandEmpty py-6 text-center text-sm"],
        ["List", <span style={note}>scroll region</span>, "max-h-[200px] overflow-y-auto"],
      ]} />
      <Guidance k="command" />
    </div>
  ),
};
