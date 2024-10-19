import { startOfWeek, addDays, format, addHours } from "date-fns";
import { cn } from "@/utils/cn";

interface Event {
  id: number;
  title: string;
  variant: "blue" | "green" | "red" | "yellow" | "purple" | "gray";
  startDate: string;
  endDate: string;
}

interface WeekProps {
  readonly currentDate: Date;
  readonly events: Event[];
}

export function Week({ currentDate }: WeekProps) {
  const weekStart = startOfWeek(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 24 }, (_, i) => addHours(new Date().setHours(0, 0, 0, 0), i));

  return (
    <div className="flex">
      {/* Time column */}
      <div className="w-16 border-r">
        <div className="h-8"></div> {/* Empty cell for alignment */}
        {hours.map((hour, index) => (
          <div key={index} className={cn("relative", index === 0 && "border-t")} style={{ height: "96px" }}>
            <div className="absolute -top-3 right-2 flex h-6 items-center">
              {index !== 0 && ( // Hide text for 12 AM (first hour)
                <span className="text-xs text-t-quaternary">{format(hour, "h a")}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Week grid */}
      <div className="flex-1">
        {/* Week header */}
        <div className="grid grid-cols-7 divide-x">
          {weekDays.map((day, index) => (
            <div key={index} className="flex flex-col items-center justify-center py-2">
              <span className="text-xs font-medium text-t-quaternary">
                {format(day, "EEE")} <span className="font-semibold text-t-secondary">{format(day, "d")}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Week body */}
        <div className="grid grid-cols-7 divide-x">
          {weekDays.map((day, dayIndex) => (
            <div key={dayIndex} className="relative">
              {hours.map((hour, hourIndex) => (
                <div key={hourIndex} className="relative" style={{ height: "96px" }}>
                  {/* Hour line */}
                  <div className="absolute inset-x-0 top-0 border-b"></div>
                  {/* 30-minute line */}
                  <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-b-tertiary"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
