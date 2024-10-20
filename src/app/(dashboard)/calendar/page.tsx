"use client";

import { useState, useMemo } from "react";
import { isSameDay, parseISO, addDays, addMonths, addWeeks, startOfWeek } from "date-fns";

import { Week } from "@/modules/calendar/components/week";
import { Month } from "@/modules/calendar/components/month";
import { Header } from "@/modules/calendar/components/header";
import { MultiDayWeekEvents } from "@/modules/calendar/components/multi-day-week-events";
import { Day } from "@/modules/calendar/components/day";

import type { IEvent } from "@/modules/calendar/interfaces";

// Ta bugado quando troca de mês e não tem eventos nesse mês.

const MOCK_EVENTS: Array<IEvent> = [
  {
    id: 1,
    title: "Meeting with John",
    startDate: "2024-10-02T10:00:00.000Z",
    endDate: "2024-10-03T10:00:00.000Z",
    variant: "blue",
  },
  {
    id: 2,
    title: "Team Brainstorming",
    startDate: "2024-10-03T14:00:00.000Z",
    endDate: "2024-10-04T16:00:00.000Z",
    variant: "green",
  },
  {
    id: 3,
    title: "Project Deadline",
    startDate: "2024-10-03T09:00:00.000Z",
    endDate: "2024-10-09T17:00:00.000Z",
    variant: "red",
  },
  {
    id: 4,
    title: "Client Presentation",
    startDate: "2024-10-02T13:00:00.000Z",
    endDate: "2024-10-10T14:30:00.000Z",
    variant: "yellow",
  },
  {
    id: 5,
    title: "Client Presentation",
    startDate: "2024-10-02T09:00:00.000Z",
    endDate: "2024-10-05T14:30:00.000Z",
    variant: "yellow",
  },
  // {
  //   id: 5,
  //   title: "Team Building",
  //   startDate: "2024-10-21T02:00:00.000Z",
  //   endDate: "2024-10-21T16:00:00.000Z",
  //   variant: "purple",
  // },
  // {
  //   id: 6,
  //   title: "Monthly Review",
  //   startDate: "2024-10-25T11:00:00.000Z",
  //   endDate: "2024-10-25T12:00:00.000Z",
  //   variant: "gray",
  // },
  // {
  //   id: 7,
  //   title: "Training Workshop",
  //   startDate: "2024-10-18T09:00:00.000Z",
  //   endDate: "2024-10-20T17:00:00.000Z",
  //   variant: "blue",
  // },
  // {
  //   id: 8,
  //   title: "Call with Sarah",
  //   startDate: "2024-10-02T15:00:00.000Z",
  //   endDate: "2024-10-02T16:00:00.000Z",
  //   variant: "green",
  // },
  // {
  //   id: 9,
  //   title: "Call with Marketing Team",
  //   startDate: "2024-10-07T11:00:00.000Z",
  //   endDate: "2024-10-07T12:00:00.000Z",
  //   variant: "blue",
  // },
  // {
  //   id: 10,
  //   title: "Call with Jeff",
  //   startDate: "2024-10-08T10:00:00.000Z",
  //   endDate: "2024-10-08T12:00:00.000Z",
  //   variant: "yellow",
  // },
  // {
  //   id: 11,
  //   title: "Call with Clients",
  //   startDate: "2024-10-10T14:00:00.000Z",
  //   endDate: "2024-10-10T15:00:00.000Z",
  //   variant: "purple",
  // },
  // {
  //   id: 12,
  //   title: "Product Launch Meeting",
  //   startDate: "2024-10-10T16:00:00.000Z",
  //   endDate: "2024-10-10T17:30:00.000Z",
  //   variant: "red",
  // },
  // {
  //   id: 13,
  //   title: "Team Lunch",
  //   startDate: "2024-10-10T12:00:00.000Z",
  //   endDate: "2024-10-10T13:30:00.000Z",
  //   variant: "green",
  // },
  // {
  //   id: 14,
  //   title: "Call with Sarah",
  //   startDate: "2024-10-16T19:00:00.000Z",
  //   endDate: "2024-10-16T22:00:00.000Z",
  //   variant: "blue",
  // },
  // {
  //   id: 15,
  //   title: "Call with Investors",
  //   startDate: "2024-10-18T09:00:00.000Z",
  //   endDate: "2024-10-18T10:30:00.000Z",
  //   variant: "gray",
  // },
  // {
  //   id: 16,
  //   title: "Project Review",
  //   startDate: "2024-10-12T10:00:00.000Z",
  //   endDate: "2024-10-12T11:30:00.000Z",
  //   variant: "blue",
  // },
  // {
  //   id: 17,
  //   title: "Team Sync",
  //   startDate: "2024-10-13T14:00:00.000Z",
  //   endDate: "2024-10-13T15:00:00.000Z",
  //   variant: "green",
  // },
  // {
  //   id: 18,
  //   title: "Client Meeting",
  //   startDate: "2024-10-14T11:00:00.000Z",
  //   endDate: "2024-10-14T12:30:00.000Z",
  //   variant: "yellow",
  // },
  // {
  //   id: 19,
  //   title: "Design Workshop",
  //   startDate: "2024-10-15T09:00:00.000Z",
  //   endDate: "2024-10-15T12:00:00.000Z",
  //   variant: "purple",
  // },
  // {
  //   id: 20,
  //   title: "Code Review",
  //   startDate: "2024-10-16T15:00:00.000Z",
  //   endDate: "2024-10-16T16:30:00.000Z",
  //   variant: "red",
  // },
  // {
  //   id: 21,
  //   title: "Product Demo",
  //   startDate: "2024-10-17T13:00:00.000Z",
  //   endDate: "2024-10-17T14:00:00.000Z",
  //   variant: "blue",
  // },
  // {
  //   id: 22,
  //   title: "Strategy Meeting",
  //   startDate: "2024-10-18T10:00:00.000Z",
  //   endDate: "2024-10-18T12:00:00.000Z",
  //   variant: "green",
  // },
  // {
  //   id: 23,
  //   title: "Team",
  //   startDate: "2024-10-18T14:00:00.000Z",
  //   endDate: "2024-10-18T17:00:00.000Z",
  //   variant: "purple",
  // },
  // {
  //   id: 24,
  //   title: "Project Kickoff",
  //   startDate: "2024-10-19T09:00:00.000Z",
  //   endDate: "2024-10-19T10:30:00.000Z",
  //   variant: "yellow",
  // },
  // {
  //   id: 25,
  //   title: "Retrospective",
  //   startDate: "2024-10-19T15:00:00.000Z",
  //   endDate: "2024-10-19T16:30:00.000Z",
  //   variant: "gray",
  // },
  // {
  //   id: 26,
  //   title: "Morning Standup",
  //   startDate: "2024-10-18T06:30:00.000Z",
  //   endDate: "2024-10-18T09:00:00.000Z",
  //   variant: "blue",
  // },
  // {
  //   id: 27,
  //   title: "Client Meeting",
  //   startDate: "2024-10-18T10:30:00.000Z",
  //   endDate: "2024-10-18T11:30:00.000Z",
  //   variant: "green",
  // },
  // {
  //   id: 28,
  //   title: "Lunch Break",
  //   startDate: "2024-10-18T12:00:00.000Z",
  //   endDate: "2024-10-18T13:00:00.000Z",
  //   variant: "yellow",
  // },
  // {
  //   id: 29,
  //   title: "Code Review Session",
  //   startDate: "2024-10-18T14:30:00.000Z",
  //   endDate: "2024-10-18T15:30:00.000Z",
  //   variant: "red",
  // },
  // {
  //   id: 30,
  //   title: "End of Day Wrap-up",
  //   startDate: "2024-10-18T17:00:00.000Z",
  //   endDate: "2024-10-18T18:00:00.000Z",
  //   variant: "purple",
  // },
  // {
  //   id: 31,
  //   title: "Random event",
  //   startDate: "2024-10-18T20:30:00.000Z",
  //   endDate: "2024-10-18T21:30:00.000Z",
  //   variant: "purple",
  // },
  // {
  //   id: 32,
  //   title: "Congress",
  //   startDate: "2024-10-10T12:00:00.000Z",
  //   endDate: "2024-10-23T12:00:00.000Z",
  //   variant: "green",
  // },
  // {
  //   id: 33,
  //   title: "Event",
  //   startDate: "2024-10-10T12:00:00.000Z",
  //   endDate: "2024-10-15T12:00:00.000Z",
  //   variant: "blue",
  // },
  // {
  //   id: 34,
  //   title: "Meeting",
  //   startDate: "2024-10-28T12:00:00.000Z",
  //   endDate: "2024-10-28T15:00:00.000Z",
  //   variant: "red",
  // },
];

// I an alignment problem, i will try to explain.

// Lets see the day 20 and 21 of october.

// In 20 oct:
// The "Congress" event is in the first row
// The "Training Workshop" event is in the second row
// The "Team Building" event is in the last (third) row.

// In 21 oct:
// The "Team building" event in in the FIRST row!!!

// See the problem? There is no consistency between days. The "Team building" event should be in the third row (and the first and second should be empty).

// You need to calculate the row position based on the previous day.

export default function Page() {
  const [view, setView] = useState<"day" | "week" | "month">("month");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { singleDayEvents, multiDayEvents } = useMemo(() => {
    const singleDay: IEvent[] = [];
    const multiDay: IEvent[] = [];

    MOCK_EVENTS.forEach(event => {
      const startDate = parseISO(event.startDate);
      const endDate = parseISO(event.endDate);

      if (isSameDay(startDate, endDate)) {
        singleDay.push(event);
      } else {
        multiDay.push(event);
      }
    });

    return { singleDayEvents: singleDay, multiDayEvents: multiDay };
  }, []);

  const changeDate = (increment: number) => {
    setSelectedDate(prevDate => {
      switch (view) {
        case "month":
          return addMonths(prevDate, increment);
        case "week":
          return addWeeks(prevDate, increment);
        case "day":
          return addDays(prevDate, increment);
      }
    });
  };

  const handleSetView = (newView: "day" | "week" | "month") => {
    setView(newView);
    if (newView === "week") {
      setSelectedDate(startOfWeek(selectedDate)); // Update this line
    }
  };

  const handleDayDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  return (
    <div className="h-fit w-full lg:rounded-xl lg:border">
      <Header selectedDate={selectedDate} onChangeDate={changeDate} setView={handleSetView} view={view} events={MOCK_EVENTS} />

      {view === "week" && <MultiDayWeekEvents selectedDate={selectedDate} multiDayEvents={multiDayEvents} />}

      {view === "month" && <Month selectedDate={selectedDate} events={singleDayEvents} multiDayEvents={multiDayEvents} />}
      {view === "week" && <Week selectedDate={selectedDate} events={singleDayEvents} />}
      {view === "day" && <Day selectedDate={selectedDate} events={singleDayEvents} onDateChange={handleDayDateChange} multiDayEvents={multiDayEvents} />}
    </div>
  );
}
