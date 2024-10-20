import { parseISO, differenceInMinutes, areIntervalsOverlapping, format } from "date-fns";
import { CalendarWeekEventCard } from "@/modules/calendar/components/week-event-card";
import { CalendarTimeline } from "@/modules/calendar/components/timeline";
import { ScrollArea } from "@/components/scroll-area";
import { useState, useEffect } from "react";
import { SingleDayPicker } from "@/components/single-day-picker";
import { MultiDayDayEvents } from "@/modules/calendar/components/multi-day-day-events";

import type { IEvent } from "@/modules/calendar/interfaces";

interface DayProps {
  readonly selectedDate: Date;
  readonly events: IEvent[];
  readonly onDateChange: (date: Date) => void;
  readonly multiDayEvents: IEvent[]; // Add this prop
}

export function Day({ selectedDate, events, onDateChange, multiDayEvents }: DayProps) {
  const [date, setDate] = useState<Date | undefined>(selectedDate);

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  const handleSelect = (value: Date | undefined) => {
    if (!value) return;

    setDate(value);
    onDateChange(value);
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventStyle = (event: IEvent, groupIndex: number, groupSize: number) => {
    const startDate = parseISO(event.startDate);
    const dayStart = new Date(selectedDate.setHours(0, 0, 0, 0));
    const eventStart = startDate < dayStart ? dayStart : startDate;
    const startMinutes = differenceInMinutes(eventStart, dayStart);

    const top = (startMinutes / 1440) * 100;
    const width = 100 / groupSize;
    const left = groupIndex * width;

    return { top: `${top}%`, width: `${width}%`, left: `${left}%` };
  };

  const groupEvents = (dayEvents: IEvent[]) => {
    const sortedEvents = dayEvents.sort((a, b) => parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime());
    const groups: IEvent[][] = [];

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
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear()
    );
  });
  const groupedEvents = groupEvents(dayEvents);

  return (
    <div className="flex border-b lg:border-b-0">
      <div className="flex flex-1 flex-col">
        {/* Day header */}
        <div>
          <MultiDayDayEvents selectedDate={selectedDate} multiDayEvents={multiDayEvents} />

          <div className="flex border-b shadow-calendar">
            <div className="w-16"></div>
            <div className="flex-1 border-l py-2 text-center">
              <span className="text-xs font-medium text-t-quaternary">
                {format(selectedDate, "EEE")} <span className="font-semibold text-t-secondary">{format(selectedDate, "d")}</span>
              </span>
            </div>
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
                        <CalendarWeekEventCard title={event.title} startDate={event.startDate} endDate={event.endDate} variant={event.variant} />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="hidden w-72 divide-y border-l md:block">
        <SingleDayPicker mode="single" selected={date} onSelect={handleSelect} initialFocus />

        <div className="px-6 py-5">
          <p>In progress...</p>
        </div>
      </div>
    </div>
  );
}
