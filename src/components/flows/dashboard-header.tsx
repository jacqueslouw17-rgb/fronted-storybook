import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type DashboardTab = "tracker" | "payroll" | "payments";

/**
 * Dashboard Header — the F1 welcome line and the main tab switch.
 * Title verbatim from AgentHeader (showPulse=false, showInput=false,
 * titleClassName "text-xl sm:text-2xl md:text-3xl"); the switch verbatim from
 * F1v61_FrontedAdminDashboard ("Workers | Payroll Tab Toggle") or, with `payments`, from
 * F1v63_FrontedAdminDashboard ("Workers | Payroll | Payments", contractors paid apart from
 * employees).
 */
export function DashboardHeader({
  title = "Welcome Joe, get to work at Acme Corp!",
  tab = "tracker",
  onTabChange,
  payments = false,
}: {
  title?: string;
  tab?: DashboardTab;
  onTabChange?: (tab: DashboardTab) => void;
  /** Show the Payments tab (v6.3: contractor payments split from employee payroll). */
  payments?: boolean;
}) {
  return (
    <>
      <div className="flex flex-col items-center space-y-3 sm:space-y-4 px-4">
        <div className="text-center space-y-1 sm:space-y-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{title}</h1>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <p className="text-sm sm:text-base"><span className="text-muted-foreground"></span></p>
          </div>
        </div>
        <div className="w-full max-w-xl space-y-2 sm:space-y-3 px-4 sm:px-0 -mt-2 sm:-mt-3" />
      </div>

      <div className="flex items-center justify-center mt-1 pb-3">
        <Tabs value={tab} onValueChange={(v) => onTabChange?.(v as DashboardTab)}>
          <TabsList className={payments ? "grid w-[380px] grid-cols-3" : "grid w-[280px] grid-cols-2"}>
            <TabsTrigger value="tracker">Workers</TabsTrigger>
            <TabsTrigger value="payroll">Payroll</TabsTrigger>
            {payments && <TabsTrigger value="payments">Payments</TabsTrigger>}
          </TabsList>
        </Tabs>
      </div>
    </>
  );
}
