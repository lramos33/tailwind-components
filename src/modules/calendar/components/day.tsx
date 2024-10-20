import { parseISO, differenceInMinutes, areIntervalsOverlapping, format } from "date-fns";
import { CalendarWeekEvent } from "@/modules/calendar/components/week-event";
import { CalendarTimeline } from "@/modules/calendar/components/timeline";
import { ScrollArea } from "@/components/scroll-area";

interface Event {
  id: number;
  title: string;
  variant: "blue" | "green" | "red" | "yellow" | "purple" | "gray";
  startDate: string;
  endDate: string;
}

interface DayProps {
  readonly currentDate: Date;
  readonly events: Event[];
}

export function Day({ currentDate, events }: DayProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventStyle = (event: Event, groupIndex: number, groupSize: number) => {
    const startDate = parseISO(event.startDate);
    const dayStart = new Date(currentDate.setHours(0, 0, 0, 0));
    const eventStart = startDate < dayStart ? dayStart : startDate;
    const startMinutes = differenceInMinutes(eventStart, dayStart);

    const top = (startMinutes / 1440) * 100;
    const width = 100 / groupSize;
    const left = groupIndex * width;

    return { top: `${top}%`, width: `${width}%`, left: `${left}%` };
  };

  const groupEvents = (dayEvents: Event[]) => {
    const sortedEvents = dayEvents.sort((a, b) => parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime());
    const groups: Event[][] = [];

    for (const event of sortedEvents) {
      const eventStart = parseISO(event.startDate);

      let placed = false;
      for (const group of groups) {
        const lastEventInGroup = group[group.length - 1];
        const lastEventEnd = parseISO(lastEventInGroup.endDate);

        if (eventStart >= lastEventEnd) {
          group.push(event);
          placed = true;
          break;
        }
      }

      if (!placed) groups.push([event]);
    }

    return groups;
  };

  const dayEvents = events.filter(event => {
    const eventDate = parseISO(event.startDate);
    return (
      eventDate.getDate() === currentDate.getDate() && eventDate.getMonth() === currentDate.getMonth() && eventDate.getFullYear() === currentDate.getFullYear()
    );
  });
  const groupedEvents = groupEvents(dayEvents);

  return (
    <div className="flex flex-col">
      {/* Day header */}
      <div className="flex border-b shadow-calendar">
        <div className="w-16"></div>
        <div className="flex-1 border-l py-2 text-center">
          <span className="text-xs font-medium text-t-quaternary">
            {format(currentDate, "EEE")} <span className="font-semibold text-t-secondary">{format(currentDate, "d")}</span>
          </span>
        </div>
      </div>

      <ScrollArea className="h-[736px]" type="always">
        <div className="flex">
          {/* Time column */}
          <div className="relative w-16">
            {hours.map((hour, index) => (
              <div key={hour} className="relative" style={{ height: "96px" }}>
                <div className="absolute -top-3 right-2 flex h-6 items-center">
                  {index !== 0 && <span className="text-xs text-t-quaternary">{format(new Date().setHours(hour), "h a")}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="relative flex-1 border-l">
            <CalendarTimeline />

            {/* Day body */}
            <div className="relative">
              {hours.map((hour, index) => (
                <div key={hour} className="relative" style={{ height: "96px" }}>
                  {index !== 0 && <div className="absolute inset-x-0 top-0 border-b"></div>}
                  <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-b-tertiary"></div>
                </div>
              ))}

              {groupedEvents.map((group, groupIndex) =>
                group.map(event => {
                  let style = getEventStyle(event, groupIndex, groupedEvents.length);
                  const hasOverlap = groupedEvents.some(
                    (otherGroup, otherIndex) =>
                      otherIndex !== groupIndex &&
                      otherGroup.some(otherEvent =>
                        areIntervalsOverlapping(
                          { start: parseISO(event.startDate), end: parseISO(event.endDate) },
                          { start: parseISO(otherEvent.startDate), end: parseISO(otherEvent.endDate) }
                        )
                      )
                  );

                  if (!hasOverlap) style = { ...style, width: "100%", left: "0%" };

                  return (
                    <div key={event.id} className="absolute p-1" style={style}>
                      <CalendarWeekEvent title={event.title} startDate={event.startDate} endDate={event.endDate} variant={event.variant} />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
