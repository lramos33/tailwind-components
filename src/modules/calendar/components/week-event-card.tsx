import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";
import { format, differenceInMinutes, parseISO } from "date-fns";

const calendarWeekEventCardVariants = cva("flex flex-col gap-0.5 truncate whitespace-nowrap rounded-md border px-2 py-1.5 text-xs", {
  variants: {
    variant: {
      blue: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
      green: "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
      red: "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
      yellow: "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
      purple: "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300",
      gray: "border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300",
    },
  },
  defaultVariants: {
    variant: "blue",
  },
});

interface CalendarWeekEventCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof calendarWeekEventCardVariants> {
  readonly title: string;
  readonly startDate: string;
  readonly endDate: string;
}

const CalendarWeekEventCard = React.forwardRef<HTMLDivElement, CalendarWeekEventCardProps>(
  ({ title, startDate, endDate, variant, className, ...props }, ref) => {
    const calendarWeekEventCardClasses = cn(calendarWeekEventCardVariants({ variant, className }));

    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const durationInMinutes = differenceInMinutes(end, start);
    const heightInPixels = (durationInMinutes / 60) * 96 - 8;

    return (
      <div ref={ref} className={calendarWeekEventCardClasses} style={{ height: `${heightInPixels}px` }} {...props}>
        <p className="truncate text-xs font-semibold">{title}</p>
        <p className="text-xs">
          {format(start, "h:mm a")} - {format(end, "h:mm a")}
        </p>
      </div>
    );
  }
);

CalendarWeekEventCard.displayName = "CalendarWeekEventCard";

export { CalendarWeekEventCard };
