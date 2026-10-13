import * as React from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Feedback Bubble — the floating "Share feedback" button, verbatim from
 * components/FeedbackBubble.tsx (default, non-Flow-6 styling). Shown on /auth; hidden on
 * the interim flow routes. `fixed` pins it bottom-right of the viewport as in the app.
 */
export function FeedbackBubble({ fixed = true }: { fixed?: boolean }) {
  return (
    <Button
      size="icon"
      variant="ghost"
      aria-label="Share feedback"
      className={cn(
        fixed ? "fixed bottom-8 right-8" : "relative",
        "h-12 w-12 rounded-full",
        "bg-primary/5 border border-primary/20",
        "transition-all duration-300 ease-out",
        "hover:scale-110 hover:-translate-y-0.5 hover:bg-primary/10 hover:border-primary/30",
        "shadow-card hover:shadow-elevated",
        "group z-[100]"
      )}
    >
      <MessageSquare className="h-4 w-4 text-primary/70 group-hover:text-primary transition-colors" />
    </Button>
  );
}
