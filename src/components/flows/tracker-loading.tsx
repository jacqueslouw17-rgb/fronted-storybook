import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Tracker Loading — the Workers tracker placeholder while workers load.
 * Verbatim from components/flows/shared/TrackerLoadingState: four columns, each a
 * header placeholder over three card placeholders, built from Skeleton.
 */
export function TrackerLoading() {
  return (
    <div className="w-full max-w-full pb-4 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-full space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
            <div className="space-y-3">
              {[...Array(3)].map((__, j) => (
                <div key={j} className="p-4 rounded-lg border border-border/50 bg-card/40 h-28 space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
