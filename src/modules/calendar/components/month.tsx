import { Fragment } from "react";
import { isToday, parseISO, isSameDay, isWithinInterval, differenceInDays, startOfDay, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";

import { BulletEvent } from "@/modules/calendar/components/bullet-event";
import { CalendarEventBadge } from "@/modules/calendar/components/event-badge";

import { cn } from "@/utils/cn";

import type { IEvent } from "@/modules/calendar/interfaces";

interface MonthProps {
  readonly selectedDate: Date;
  readonly events: Array<IEvent>;
  readonly multiDayEvents: Array<IEvent>;
}

export function Month({ selectedDate, events, multiDayEvents }: MonthProps) {
  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();

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

  const calculateEventPositions = (events: IEvent[]) => {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(selectedDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const eventPositions: { [key: string]: number } = {};
    const occupiedPositions: { [key: string]: boolean[] } = {};

    daysInMonth.forEach(day => {
      occupiedPositions[day.toISOString()] = [false, false, false];
    });

    events.sort((a, b) => {
      const aDuration = differenceInDays(parseISO(a.endDate), parseISO(a.startDate));
      const bDuration = differenceInDays(parseISO(b.endDate), parseISO(b.startDate));
      return bDuration - aDuration || parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime();
    });

    events.forEach(event => {
      const eventStart = parseISO(event.startDate);
      const eventEnd = parseISO(event.endDate);
      const eventDays = eachDayOfInterval({ start: eventStart, end: eventEnd });

      let position = -1;
      for (let i = 0; i < 3; i++) {
        if (eventDays.every(day => !occupiedPositions[startOfDay(day).toISOString()][i])) {
          position = i;
          break;
        }
      }

      if (position !== -1) {
        eventDays.forEach(day => {
          occupiedPositions[startOfDay(day).toISOString()][position] = true;
        });
        eventPositions[event.id] = position;
      }
    });

    return eventPositions;
  };

  const eventPositions = calculateEventPositions([...multiDayEvents, ...events]);

  const getEventsForDate = (date: Date) => {
    const eventsForDate = [...multiDayEvents, ...events].filter(event => {
      const eventStart = parseISO(event.startDate);
      const eventEnd = parseISO(event.endDate);
      return isWithinInterval(date, { start: eventStart, end: eventEnd }) || isSameDay(date, eventStart);
    });

    return eventsForDate
      .map(event => ({
        ...event,
        position: eventPositions[event.id] ?? -1,
      }))
      .sort((a, b) => a.position - b.position);
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

          return (
            <div key={index} className={cn("flex flex-col gap-1 py-1.5 lg:py-2", index > 6 && "border-t", index % 7 !== 0 && "border-l")}>
              <span
                className={cn(
                  "h-6 px-1 text-xs font-semibold lg:px-2",
                  !currentMonth && "opacity-50",
                  isToday(date) && "flex w-6 translate-x-1 items-center justify-center rounded-full bg-primary-600 px-0 font-bold text-white"
                )}
              >
                {day}
              </span>

              <div className={cn("flex h-6 flex-col gap-1 px-2 md:h-[86px] md:gap-0.5 md:px-0", !currentMonth && "opacity-50")}>
                {[0, 1, 2].map(position => {
                  const event = cellEvents.find(e => e.position === position);
                  return (
                    <div key={position} className="flex-1">
                      {event && <CalendarEventBadge className="hidden md:flex" event={event} cellDate={startOfDay(date)} />}
                    </div>
                  );
                })}
              </div>

              <p className={cn("h-4.5 px-1.5 text-xs font-semibold text-t-quaternary", !currentMonth && "opacity-50")}>
                {cellEvents.length > 3 && (
                  <>
                    <span className="sm:hidden">+{cellEvents.length - 3}</span>
                    <span className="hidden sm:inline">{cellEvents.length - 3} more...</span>
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
