import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { endOfDay, format, isSameDay, parseISO, startOfDay } from "date-fns";

import { cn } from "@/utils/cn";

import type { IEvent } from "@/modules/calendar/interfaces";

const calendarEventBadgeVariants = cva(
  "mx-1 flex size-auto h-6.5 select-none items-center justify-between gap-1.5 truncate whitespace-nowrap rounded-md border px-2 text-xs",
  {
    variants: {
      variant: {
        blue: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
        green: "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
        red: "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
        yellow: "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
        purple: "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300",
        gray: "border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300",
      },
      multiDayPosition: {
        first: "z-10 mr-0 w-[calc(100%_+_1px)] rounded-r-none border-r-0 [&>span]:mr-2.5",
        middle: "z-10 mx-0 w-[calc(100%_+_1px)] rounded-none border-x-0",
        last: "ml-0 rounded-l-none border-l-0",
        none: "",
      },
    },
    defaultVariants: {
      variant: "blue",
    },
  }
);

interface CalendarEventBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof calendarEventBadgeVariants>, "variant" | "multiDayPosition"> {
  readonly event: IEvent;
  readonly cellDate: Date;
  readonly eventCurrentDay?: number;
  readonly eventTotalDays?: number;
}

const CalendarEventBadge = React.forwardRef<HTMLDivElement, CalendarEventBadgeProps>(
  ({ event, className, cellDate, eventCurrentDay, eventTotalDays, ...props }, ref) => {
    const eventStart = startOfDay(parseISO(event.startDate));
    const eventEnd = endOfDay(parseISO(event.endDate));

    if (cellDate < eventStart || cellDate > eventEnd) return null;

    let position: "first" | "middle" | "last" | "none" | undefined;

    if (eventCurrentDay && eventTotalDays) {
      position = "none";
    } else if (isSameDay(eventStart, eventEnd)) {
      position = "none";
    } else if (isSameDay(cellDate, eventStart)) {
      position = "first";
    } else if (isSameDay(cellDate, eventEnd)) {
      position = "last";
    } else {
      position = "middle";
    }

    const calendarEventBadgeClasses = cn(calendarEventBadgeVariants({ variant: event.variant, multiDayPosition: position, className }));

    const renderBadgeText = ["first", "none"].includes(position);

    return (
      <div ref={ref} className={calendarEventBadgeClasses} {...props}>
        {renderBadgeText && (
          <p className="flex-1 truncate font-semibold">
            {eventCurrentDay && (
              <span className="text-xs">
                Day {eventCurrentDay} of {eventTotalDays} •{" "}
              </span>
            )}
            {event.title}
          </p>
        )}

        {renderBadgeText && <span>{format(new Date(event.startDate), "h:mm a")}</span>}
      </div>
    );
  }
);

CalendarEventBadge.displayName = "CalendarEventBadge";

export { CalendarEventBadge };
