import { useMemo } from "react";
import { parseISO, startOfDay, startOfWeek, endOfWeek, addDays, isWithinInterval, differenceInDays } from "date-fns";

import { CalendarEventBadge } from "@/modules/calendar/components/event-badge";

import type { IEvent } from "@/modules/calendar/interfaces";

interface MultiDayWeekEventsProps {
  readonly selectedDate: Date;
  readonly multiDayEvents: IEvent[];
}

export function MultiDayWeekEvents({ selectedDate, multiDayEvents }: MultiDayWeekEventsProps) {
  const weekStart = startOfWeek(selectedDate);
  const weekEnd = endOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const multiDayEventsInWeek = useMemo(() => {
    return multiDayEvents
      .filter(event => {
        const eventStart = parseISO(event.startDate);
        const eventEnd = parseISO(event.endDate);
        return (
          isWithinInterval(eventStart, { start: weekStart, end: weekEnd }) ||
          isWithinInterval(eventEnd, { start: weekStart, end: weekEnd }) ||
          (eventStart <= weekStart && eventEnd >= weekEnd)
        );
      })
      .sort((a, b) => {
        const durationA = differenceInDays(parseISO(a.endDate), parseISO(a.startDate));
        const durationB = differenceInDays(parseISO(b.endDate), parseISO(b.startDate));
        return durationA - durationB;
      });
  }, [multiDayEvents, weekStart, weekEnd]);

  if (multiDayEventsInWeek.length === 0) return null;

  return (
    <div className="hidden sm:flex">
      <div className="w-16 border-b shadow-calendar"></div>
      <div className="grid flex-1 grid-cols-7 divide-x border-b border-l">
        {weekDays.map((day, index) => (
          <div key={index} className="flex h-full flex-col justify-end gap-1 py-1">
            {multiDayEventsInWeek.map(event => (
              <CalendarEventBadge key={event.id} event={event} cellDate={startOfDay(day)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
