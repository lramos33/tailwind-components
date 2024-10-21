import { useMemo } from "react";
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isBefore, isAfter, parseISO, format } from "date-fns";

import { Badge } from "@/components/badge";
import { Button, ButtonGroup } from "@/components/button";

import { ChevronLeft, ChevronRight, Columns, Grid3X3, List, Plus } from "@/components/icons";

import { formatMonthRange, formatWeekRange } from "@/utils/date.helper";
import type { IEvent } from "@/modules/calendar/interfaces";

interface HeaderProps {
  readonly selectedDate: Date;
  readonly onChangeDate: (increment: number) => void;
  readonly setView: (view: "day" | "week" | "month") => void;
  readonly view: "day" | "week" | "month";
  readonly events: IEvent[];
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function Header({ selectedDate, onChangeDate, setView, view, events }: HeaderProps) {
  const month = MONTH_NAMES[selectedDate.getMonth()];
  const year = selectedDate.getFullYear();

  const getDateRangeText = () => {
    switch (view) {
      case "month":
        return formatMonthRange(selectedDate);
      case "week":
        return formatWeekRange(selectedDate);
      case "day":
        return format(selectedDate, "MMMM d, yyyy");
    }
  };

  const numOfEventsInRange = useMemo(() => {
    let rangeStart: Date, rangeEnd: Date;

    switch (view) {
      case "month":
        rangeStart = startOfMonth(selectedDate);
        rangeEnd = endOfMonth(selectedDate);
        break;
      case "week":
        rangeStart = startOfWeek(selectedDate);
        rangeEnd = endOfWeek(selectedDate);
        break;
      case "day":
        rangeStart = startOfDay(selectedDate);
        rangeEnd = endOfDay(selectedDate);
        break;
    }

    return events.filter(event => {
      const eventStart = parseISO(event.startDate);
      const eventEnd = parseISO(event.endDate);
      return (isAfter(eventStart, rangeStart) || isAfter(eventEnd, rangeStart)) && (isBefore(eventStart, rangeEnd) || isBefore(eventEnd, rangeEnd));
    }).length;
  }, [selectedDate, view, events]);

  return (
    <div className="flex flex-col gap-4 border-b p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <div className="size-14 overflow-hidden rounded-lg border">
          <span className="flex h-6 items-center justify-center bg-primary-600 text-center text-xs font-semibold text-white">
            {new Date().toLocaleString("default", { month: "short" }).toUpperCase()}
          </span>
          <span className="flex items-center justify-center text-lg font-bold">{new Date().getDate()}</span>
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">{`${month} ${year}`}</span>
            {numOfEventsInRange > 0 && <Badge>{numOfEventsInRange} events</Badge>}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="size-6.5 px-0 [&_svg]:size-4.5" onClick={() => onChangeDate(-1)}>
              <ChevronLeft />
            </Button>

            <p className="text-sm text-t-tertiary">{getDateRangeText()}</p>

            <Button variant="outline" className="size-6.5 px-0 [&_svg]:size-4.5" onClick={() => onChangeDate(1)}>
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <ButtonGroup>
          <Button onClick={() => setView("day")}>
            <List />
            <span className="hidden xl:block">Day</span>
          </Button>

          <Button onClick={() => setView("week")} className="hidden sm:flex">
            <Columns />
            <span className="hidden xl:block">Week</span>
          </Button>

          <Button onClick={() => setView("month")}>
            <Grid3X3 />
            <span className="hidden xl:block">Month</span>
          </Button>
        </ButtonGroup>

        <Button className="flex-1">
          <Plus />
          Add Event
        </Button>
      </div>
    </div>
  );
}
