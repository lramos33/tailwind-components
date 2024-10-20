import { CalendarMonthEvent } from "@/modules/calendar/components/month-event";
import { parseISO, startOfDay, endOfDay, isSameDay, differenceInDays } from "date-fns";

interface Event {
  id: number;
  title: string;
  variant: "blue" | "green" | "red" | "yellow" | "purple" | "gray";
  startDate: string;
  endDate: string;
}

interface MultiDayWeekEventsProps {
  readonly weekDays: Date[];
  readonly multiDayEvents: Event[];
  readonly isEventInWeek: (event: Event) => boolean;
}

export function MultiDayWeekEvents({ weekDays, multiDayEvents, isEventInWeek }: MultiDayWeekEventsProps) {
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
    } else if (cellDate > eventStart && cellDate < eventEnd) {
      return "middle";
    } else {
      return undefined;
    }
  };

  const sortedEvents = [...multiDayEvents].sort((a, b) => {
    const durationA = differenceInDays(parseISO(a.endDate), parseISO(a.startDate));
    const durationB = differenceInDays(parseISO(b.endDate), parseISO(b.startDate));
    return durationA - durationB;
  });

  return (
    <div className="flex">
      <div className="w-16 border-b shadow-calendar"></div>
      <div className="grid flex-1 grid-cols-7 divide-x border-b border-l">
        {weekDays.map((day, index) => (
          <div key={index} className="flex h-full flex-col justify-end gap-1 py-1">
            {sortedEvents.filter(isEventInWeek).map(event => {
              const position = getEventPosition(event, day);

              if (position) {
                return <CalendarMonthEvent key={event.id} title={event.title} startDate={event.startDate} variant={event.variant} multiDay={position} />;
              }

              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
