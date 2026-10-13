import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  // Static status/label chip — no hover states (badges aren't interactive in the flows).
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-normal cursor-default",
  {
    variants: {
      variant: {
        default: "border-transparent bg-foreground/8 text-foreground/70",
        secondary: "border-transparent bg-muted text-muted-foreground",
        destructive: "border-transparent bg-destructive/10 text-destructive",
        outline: "text-foreground border-border",
        accent: "border-transparent bg-accent/10 text-accent",
        primary: "border-transparent bg-primary/10 text-emphasis",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ className, variant, ...props }, ref) => {
  return <div data-ds="badge" ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />;
});
Badge.displayName = "Badge";

export { Badge, badgeVariants };
