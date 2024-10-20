import { startOfWeek, addDays, format, parseISO, isSameDay, differenceInMinutes, areIntervalsOverlapping } from "date-fns";
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

interface WeekProps {
  readonly currentDate: Date;
  readonly events: Event[];
}

export function Week({ currentDate, events }: WeekProps) {
  const weekStart = startOfWeek(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventStyle = (event: Event, day: Date, groupIndex: number, groupSize: number) => {
    const startDate = parseISO(event.startDate);
    const dayStart = new Date(day.setHours(0, 0, 0, 0));
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

  return (
    <div className="flex flex-col">
      {/* Week header */}
      <div className="flex">
        <div className="w-16 border-b shadow-calendar"></div>
        <div className="grid flex-1 grid-cols-7 divide-x border-b border-l shadow-calendar">
          {weekDays.map((day, index) => (
            <div key={index} className="flex flex-col items-center justify-center py-2">
              <span className="text-xs font-medium text-t-quaternary">
                {format(day, "EEE")} <span className="font-semibold text-t-secondary">{format(day, "d")}</span>
              </span>
            </div>
          ))}
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

          {/* Week grid */}
          <div className="relative flex-1 border-l">
            <CalendarTimeline />

            {/* Week body */}
            <div className="grid grid-cols-7 divide-x">
              {weekDays.map((day, dayIndex) => {
                const dayEvents = events.filter(event => isSameDay(parseISO(event.startDate), day) || isSameDay(parseISO(event.endDate), day));
                const groupedEvents = groupEvents(dayEvents);

                return (
                  <div key={dayIndex} className="relative">
                    {hours.map((hour, index) => (
                      <div key={hour} className="relative" style={{ height: "96px" }}>
                        {index !== 0 && <div className="absolute inset-x-0 top-0 border-b"></div>}
                        <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-b-tertiary"></div>
                      </div>
                    ))}

                    {groupedEvents.map((group, groupIndex) =>
                      group.map(event => {
                        let style = getEventStyle(event, day, groupIndex, groupedEvents.length);
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
                );
              })}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
