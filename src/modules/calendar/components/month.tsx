import { isToday, parseISO, isSameDay, isWithinInterval, differenceInDays, startOfDay, endOfDay } from "date-fns";

import { cn } from "@/utils/cn";
import { CalendarMonthEvent } from "@/modules/calendar/components/month-event";

interface Event {
  id: number;
  title: string;
  variant: "blue" | "green" | "red" | "yellow" | "purple" | "gray";
  startDate: string;
  endDate: string;
}

interface MonthProps {
  readonly currentDate: Date;
  readonly events: Array<Event>;
}

export function Month({ currentDate, events }: MonthProps) {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1);
  const totalDays = firstDayOfMonth + daysInMonth;

  const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => ({
    day: daysInPrevMonth - firstDayOfMonth + i + 1,
    currentMonth: false,
    date: new Date(currentYear, currentMonth - 1, daysInPrevMonth - firstDayOfMonth + i + 1),
  }));

  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    currentMonth: true,
    date: new Date(currentYear, currentMonth, i + 1),
  }));

  const nextMonthDays = Array.from({ length: (7 - (totalDays % 7)) % 7 }, (_, i) => ({
    day: i + 1,
    currentMonth: false,
    date: new Date(currentYear, currentMonth + 1, i + 1),
  }));

  const allCells = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  // TO DO: check this function
  const getEventsForDate = (date: Date) => {
    return events
      .filter(event => {
        const eventStart = parseISO(event.startDate);
        const eventEnd = parseISO(event.endDate);
        return isWithinInterval(date, { start: eventStart, end: eventEnd }) || isSameDay(date, eventStart) || isSameDay(date, eventEnd);
      })
      .sort((a, b) => {
        const aDuration = differenceInDays(parseISO(a.endDate), parseISO(a.startDate));
        const bDuration = differenceInDays(parseISO(b.endDate), parseISO(b.startDate));
        if (aDuration !== bDuration) return bDuration - aDuration;
        return parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime();
      });
  };

  // TO DO: check this function
  const getEventPosition = (event: Event, date: Date) => {
    const eventStart = startOfDay(parseISO(event.startDate));
    const eventEnd = endOfDay(parseISO(event.endDate));
    const cellDate = startOfDay(date);

    if (isSameDay(eventStart, eventEnd)) {
      return undefined;
    } else if (isSameDay(cellDate, eventStart)) {
      return "first";
    } else if (isSameDay(cellDate, eventEnd)) {
      return "last";
    } else {
      return "middle";
    }
  };

  return (
    <div>
      <div className="grid grid-cols-7 divide-x border-b">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className="flex items-center justify-center py-2">
            <span className="text-xs font-medium text-t-quaternary">{day}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 overflow-hidden border-b lg:border-b-0">
        {allCells.map(({ day, currentMonth, date }, index) => {
          const cellEvents = getEventsForDate(date);
          const displayEvents = cellEvents.slice(0, 3);
          const remainingEvents = cellEvents.length - 3;

          return (
            <div key={index} className={cn("flex flex-col gap-1 py-1.5 lg:py-2", index > 6 && "border-t", index % 7 !== 0 && "border-l")}>
              <span
                className={cn(
                  "h-6 text-xs font-semibold lg:px-1.5",
                  !currentMonth && "opacity-50",
                  isToday(date) && "flex w-6 translate-x-1 items-center justify-center rounded-full bg-primary-600 px-0 font-bold text-white"
                )}
              >
                {day}
              </span>

              <div className={cn("flex h-2 gap-1 px-2 sm:h-[86px] sm:flex-col sm:px-0", !currentMonth && "opacity-50")}>
                {displayEvents.map(event => (
                  <CalendarMonthEvent
                    key={event.id}
                    title={event.title}
                    startDate={event.startDate}
                    variant={event.variant}
                    multiDay={getEventPosition(event, date)}
                  />
                ))}
              </div>

              <p className={cn("h-4.5 px-1.5 text-xs font-semibold text-t-quaternary", !currentMonth && "opacity-50")}>
                {remainingEvents > 0 && (
                  <>
                    <span className="sm:hidden">+{remainingEvents}</span>
                    <span className="hidden sm:inline">{remainingEvents} more...</span>
                  </>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
