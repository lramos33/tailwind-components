import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";
import { format } from "date-fns";

const calendarMonthEventVariants = cva(
  "flex size-2 items-center justify-between gap-1.5 truncate whitespace-nowrap rounded-full text-xs sm:size-auto sm:rounded-md sm:border sm:px-2 sm:py-1",
  {
    variants: {
      variant: {
        blue: "border-blue-200 bg-blue-700 text-blue-700 dark:border-blue-800 dark:text-blue-300 sm:bg-blue-50 sm:dark:bg-blue-950",
        green: "border-green-200 bg-green-700 text-green-700 dark:border-green-800 dark:text-green-300 sm:bg-green-50 sm:dark:bg-green-950",
        red: "border-red-200 bg-red-700 text-red-700 dark:border-red-800 dark:text-red-300 sm:bg-red-50 sm:dark:bg-red-950",
        yellow: "border-yellow-200 bg-yellow-700 text-yellow-700 dark:border-yellow-800 dark:text-yellow-300 sm:bg-yellow-50 sm:dark:bg-yellow-950",
        purple: "border-purple-200 bg-purple-700 text-purple-700 dark:border-purple-800 dark:text-purple-300 sm:bg-purple-50 sm:dark:bg-purple-950",
        gray: "border-gray-200 bg-gray-700 text-gray-700 dark:border-gray-700 dark:text-gray-300 sm:bg-gray-50 sm:dark:bg-gray-800",
      },
    },
    defaultVariants: {
      variant: "blue",
    },
  }
);

interface CalendarMonthEventProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof calendarMonthEventVariants> {
  readonly title: string;
  readonly startDate: string;
}

const CalendarMonthEvent = React.forwardRef<HTMLDivElement, CalendarMonthEventProps>(({ title, startDate, variant, className, ...props }, ref) => {
  const calendarMonthEventClasses = cn(calendarMonthEventVariants({ variant, className }));

  return (
    <div ref={ref} className={calendarMonthEventClasses} {...props}>
      <p className="hidden flex-1 select-none truncate font-semibold sm:block">{title}</p>
      <p className="hidden sm:block">{format(startDate, "h:mm a")}</p>
    </div>
  );
});

CalendarMonthEvent.displayName = "CalendarMonthEvent";

export { CalendarMonthEvent };
