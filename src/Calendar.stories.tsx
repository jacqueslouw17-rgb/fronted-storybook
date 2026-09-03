import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { Guidance } from "./guidance";
import "./tokens.css";
import "./typography.css";

/**
 * Components — Calendar / Date picker (react-day-picker, verbatim ui/calendar).
 * Single-date selection — overtime date, period range. Flow usage is `mode="single"`
 * inside a Popover, with p-3, opened from a button that shows the chosen date.
 */
const meta: Meta = { title: "Components/Calendar", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const dayBase = "inline-flex items-center justify-center h-9 w-9 rounded-md text-sm font-normal";

function DatePicker() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-[240px] h-10 justify-start text-left font-normal text-sm", !date && "text-muted-foreground")}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={(d) => { setDate(d); setOpen(false); }} initialFocus className="p-3 pointer-events-auto" />
      </PopoverContent>
    </Popover>
  );
}

export const CalendarStory: Story = {
  name: "Calendar",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Calendar / Date picker"
        lead={<>
        Single-date selection — overtime date, pay period. Verbatim from the flows: a button showing the chosen
        date opens a Popover with the month grid; picking a day closes it.
        </>}
      />

      <h3 style={eyebrow}>Live example — date picker</h3>
      <DatePicker />

      <h3 style={eyebrow}>Day states</h3>
      <DocTable head={["State", "Day", "classes"]} w0={140} wLast={340} rows={[
        ["Default", <span className={cn(dayBase, "hover:bg-muted")}>12</span>, "day = ghost button · h-9 w-9 · hover:bg-muted hover:text-foreground"],
        ["Selected", <span className={cn(dayBase, "bg-primary text-primary-foreground")}>15</span>, "bg-primary text-primary-foreground (hover keeps primary)"],
        ["Today", <span className={cn(dayBase, "bg-primary/10 text-foreground")}>27</span>, "day_today: bg-primary/10 text-foreground"],
        ["Outside month", <span className={cn(dayBase, "text-muted-foreground opacity-50")}>30</span>, "day-outside text-muted-foreground opacity-50"],
        ["Disabled", <span className={cn(dayBase, "text-muted-foreground opacity-50")}>3</span>, "day-disabled text-muted-foreground opacity-50 pointer-events-none"],
      ]} />

      <h3 style={eyebrow}>Inline calendar</h3>
      <div className="rounded-md border bg-card w-fit">
        <Calendar mode="single" selected={new Date()} className="p-3 pointer-events-auto" />
      </div>
      <p style={{ ...note, marginTop: 10 }}>mode="single" · p-3 · caption + nav chevrons top corners · weekday row text-muted-foreground · cells h-9 w-9</p>
      <Guidance k="calendar" />
    </div>
  ),
};
