import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const bulletEventVariants = cva("size-2 rounded-full", {
  variants: {
    variant: {
      blue: "bg-blue-600",
      green: "bg-green-600",
      red: "bg-red-600",
      yellow: "bg-yellow-600",
      purple: "bg-purple-600",
      gray: "bg-gray-600",
    },
  },
  defaultVariants: {
    variant: "blue",
  },
});

interface BulletEventProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bulletEventVariants> {}

const BulletEvent = React.forwardRef<HTMLDivElement, BulletEventProps>(({ variant, className, ...props }, ref) => {
  const bulletEventClasses = cn(bulletEventVariants({ variant, className }));

  return <div ref={ref} className={bulletEventClasses} {...props} />;
});

BulletEvent.displayName = "BulletEvent";

export { BulletEvent };
