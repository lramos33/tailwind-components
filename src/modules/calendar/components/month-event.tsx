import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";
import { format } from "date-fns";

const calendarMonthEventVariants = cva(
  "flex size-2 items-center justify-between gap-1.5 truncate whitespace-nowrap rounded-full border-0 text-xs sm:mx-1.5 sm:size-auto sm:h-6.5 sm:rounded-md sm:border sm:px-2 lg:mx-2",
  {
    variants: {
      variant: {
        blue: "border-blue-200 bg-blue-700 text-blue-700 dark:border-blue-800 dark:text-blue-300 sm:bg-blue-50 sm:dark:bg-blue-950",
        green: "border-green-200 bg-green-700 text-green-700 dark:border-green-800 dark:text-green-300 sm:bg-green-50 sm:dark:bg-green-950",
        red: "border-red-200 bg-red-700 text-red-700 dark:border-red-800 dark:text-red-300 sm:bg-red-50 sm:dark:bg-red-950",
        yellow: "border-yellow-200 bg-yellow-700 text-yellow-700 dark:border-yellow-800 dark:text-yellow-300 sm:bg-yellow-50 sm:dark:bg-yellow-950",
        purple: "border-purple-200 bg-purple-700 text-purple-700 dark:border-purple-800 dark:text-purple-300 sm:bg-purple-50 sm:dark:bg-purple-950",
        gray: "border-gray-200 bg-gray-700 text-gray-700 dark:border-gray-700 dark:text-gray-300 sm:bg-gray-50 sm:dark:bg-gray-900",
      },
      multiDay: {
        first: "z-10 mr-0 border sm:mr-0 sm:w-[calc(100%_+_1px)] sm:rounded-r-none sm:border-r-0 lg:mr-0 [&>span]:sm:mr-4.5",
        middle: "z-10 mx-0 sm:mx-0 sm:w-[calc(100%_+_1px)] sm:rounded-none sm:border-x-0 lg:mx-0",
        last: "ml-0 sm:ml-0 sm:rounded-l-none sm:border-l-0 lg:ml-0",
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
  readonly multiDay?: "first" | "middle" | "last";
}

const CalendarMonthEvent = React.forwardRef<HTMLDivElement, CalendarMonthEventProps>(({ title, startDate, variant, multiDay, className, ...props }, ref) => {
  const calendarMonthEventClasses = cn(calendarMonthEventVariants({ variant, multiDay, className }));

  return (
    <div ref={ref} className={calendarMonthEventClasses} {...props}>
      {(!multiDay || multiDay === "first") && <p className="hidden flex-1 select-none truncate font-semibold sm:block">{title}</p>}
      {(!multiDay || multiDay === "first") && <span className="hidden sm:block">{format(new Date(startDate), "h:mm a")}</span>}
    </div>
  );
});

CalendarMonthEvent.displayName = "CalendarMonthEvent";

export { CalendarMonthEvent };
