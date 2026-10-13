import * as React from "react";

/**
 * Admin Dashboard Shell — the F1 v6.1 page frame around the Workers tracker.
 * Verbatim layout chain from F1v61_FrontedAdminDashboard (tracker tab): fixed topbar +
 * spacer, the static gradient background, the AgentLayout column and the centred content
 * column (lg:px-16 xl:px-32 2xl:px-40, pt-28) holding the header and the tracker body.
 * Slots: `topbar`, `header`, and the tracker body as children.
 */
export function AdminDashboardShell({
  topbar,
  header,
  children,
}: {
  topbar?: React.ReactNode;
  header?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col w-full bg-background lg:h-screen lg:min-h-0 lg:overflow-hidden">
      {topbar}
      {/* Spacer preserving layout now that the top navigation is pinned */}
      <div className="h-14 sm:h-16 flex-shrink-0" />

      <main className="flex-1 min-h-0 flex overflow-hidden relative">
        {/* Static background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-secondary/[0.02] to-accent/[0.03]" />
          <div className="absolute -top-20 -left-24 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-10"
               style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--secondary) / 0.05))" }} />
          {/* `opacity-8` is not in the scale, so it renders at full opacity in the app too. */}
          <div className="absolute -bottom-24 -right-28 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-8"
               style={{ background: "linear-gradient(225deg, hsl(var(--accent) / 0.06), hsl(var(--primary) / 0.04))" }} />
        </div>

        {/* AgentLayout (panel closed) */}
        <div className="flex w-full min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-64px)] flex-col lg:flex-row overflow-hidden lg:h-full lg:min-h-0">
          <div className="min-h-full w-full lg:w-auto overflow-y-auto lg:h-full lg:min-h-0 lg:overflow-hidden" style={{ width: "100%" }}>
            <div className="flex-1 overflow-auto relative min-h-full lg:h-full lg:min-h-0 lg:overflow-hidden">
              <div className="relative z-10 min-h-full lg:h-full lg:min-h-0 lg:overflow-hidden">
                <div className="flex-1 overflow-y-auto lg:min-h-0 lg:overflow-hidden">
                  <div className="max-w-[2376px] lg:h-full lg:min-h-0 lg:flex lg:flex-col lg:overflow-hidden lg:px-16 xl:px-32 2xl:px-40 mx-auto px-4 pt-20 sm:pt-28 pb-16 sm:pb-32">
                    {header}
                    <div className="pt-6 lg:flex-1 lg:min-h-0 lg:overflow-hidden">
                      <div className="space-y-4 lg:h-full lg:min-h-0">
                        <div className="lg:h-full lg:min-h-0">{children}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
