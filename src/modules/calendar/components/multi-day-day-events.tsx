import { useMemo } from "react";
import { parseISO, isWithinInterval, differenceInDays, startOfDay, endOfDay } from "date-fns";

import { CalendarEventBadge } from "@/modules/calendar/components/event-badge";

import type { IEvent } from "@/modules/calendar/interfaces";

interface MultiDayDayEventsProps {
  readonly selectedDate: Date;
  readonly multiDayEvents: IEvent[];
}

export function MultiDayDayEvents({ selectedDate, multiDayEvents }: MultiDayDayEventsProps) {
  const multiDayEventsInDay = useMemo(() => {
    const dayStart = startOfDay(selectedDate);
    const dayEnd = endOfDay(selectedDate);

    return multiDayEvents
      .filter(event => {
        const eventStart = parseISO(event.startDate);
        const eventEnd = parseISO(event.endDate);

        const isOverlapping =
          isWithinInterval(dayStart, { start: eventStart, end: eventEnd }) ||
          isWithinInterval(dayEnd, { start: eventStart, end: eventEnd }) ||
          (eventStart <= dayStart && eventEnd >= dayEnd);

        return isOverlapping;
      })
      .sort((a, b) => {
        const durationA = differenceInDays(parseISO(a.endDate), parseISO(a.startDate));
        const durationB = differenceInDays(parseISO(b.endDate), parseISO(b.startDate));
        return durationB - durationA;
      });
  }, [multiDayEvents, selectedDate]);

  if (multiDayEventsInDay.length === 0) return null;

  return (
    <div className="flex border-b">
      <div className="w-16 shadow-calendar"></div>
      <div className="flex flex-1 flex-col gap-1 border-l py-1">
        {multiDayEventsInDay.map(event => {
          const eventStart = startOfDay(parseISO(event.startDate));
          const eventEnd = startOfDay(parseISO(event.endDate));
          const currentDate = startOfDay(selectedDate);

          const eventTotalDays = differenceInDays(eventEnd, eventStart) + 1;
          const eventCurrentDay = differenceInDays(currentDate, eventStart) + 1;

          return <CalendarEventBadge key={event.id} event={event} cellDate={selectedDate} eventCurrentDay={eventCurrentDay} eventTotalDays={eventTotalDays} />;
        })}
      </div>
    </div>
  );
}
