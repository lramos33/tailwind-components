import { format } from "date-fns";
import { useEffect, useState, forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";

import { cn } from "@/utils/cn";

type TCalendarTimelineRef = ElementRef<"div">;
type TCalendarTimelineProps = ComponentPropsWithoutRef<"div">;

const CalendarTimeline = forwardRef<TCalendarTimelineRef, TCalendarTimelineProps>(({ className, ...props }, ref) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const getCurrentTimePosition = () => {
    const minutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    return (minutes / 1440) * 100;
  };

  const formatCurrentTime = () => {
    return format(currentTime, "h:mm a");
  };

  return (
    <div
      ref={ref}
      className={cn("pointer-events-none absolute inset-x-0 z-50 border-t border-primary-600 dark:border-primary-700", className)}
      style={{ top: `${getCurrentTimePosition()}%` }}
      {...props}
    >
      <div className="absolute -left-1.5 -top-1.5 size-3 rounded-full bg-primary-600 dark:bg-primary-700"></div>

      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-primary px-1 text-xs font-medium text-primary-600 dark:text-primary-700">
        {formatCurrentTime()}
      </div>
    </div>
  );
});

CalendarTimeline.displayName = "CalendarTimeline";

export { CalendarTimeline };
