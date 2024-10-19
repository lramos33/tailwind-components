"use client";

import { useState } from "react";
import { Header } from "@/modules/calendar/components/header";
import { Month } from "@/modules/calendar/components/month";
import { Week } from "@/modules/calendar/components/week";

interface Event {
  id: number;
  title: string;
  variant: "blue" | "green" | "red" | "yellow" | "purple" | "gray";
  startDate: string;
  endDate: string;
}

const MOCK_EVENTS: Array<Event> = [
  {
    id: 1,
    title: "Meeting with John",
    startDate: "2024-10-01T10:00:00.000Z",
    endDate: "2024-10-01T11:00:00.000Z",
    variant: "blue",
  },
  {
    id: 2,
    title: "Team Brainstorming",
    startDate: "2024-10-05T14:00:00.000Z",
    endDate: "2024-10-05T16:00:00.000Z",
    variant: "green",
  },
  {
    id: 3,
    title: "Project Deadline",
    startDate: "2024-10-10T09:00:00.000Z",
    endDate: "2024-10-10T17:00:00.000Z",
    variant: "red",
  },
  {
    id: 4,
    title: "Client Presentation",
    startDate: "2024-10-15T13:00:00.000Z",
    endDate: "2024-10-15T14:30:00.000Z",
    variant: "yellow",
  },
  {
    id: 5,
    title: "Team Building Event",
    startDate: "2024-10-21T10:00:00.000Z",
    endDate: "2024-10-21T16:00:00.000Z",
    variant: "purple",
  },
  {
    id: 6,
    title: "Monthly Review",
    startDate: "2024-10-25T11:00:00.000Z",
    endDate: "2024-10-25T12:00:00.000Z",
    variant: "gray",
  },
  {
    id: 7,
    title: "Training Workshop",
    startDate: "2024-10-28T09:00:00.000Z",
    endDate: "2024-10-29T17:00:00.000Z",
    variant: "blue",
  },
  {
    id: 8,
    title: "Call with Sarah",
    startDate: "2024-10-02T15:00:00.000Z",
    endDate: "2024-10-02T16:00:00.000Z",
    variant: "green",
  },
  {
    id: 9,
    title: "Call with Marketing Team",
    startDate: "2024-10-07T11:00:00.000Z",
    endDate: "2024-10-07T12:00:00.000Z",
    variant: "blue",
  },
  {
    id: 10,
    title: "Call with Jeff",
    startDate: "2024-10-08T10:00:00.000Z",
    endDate: "2024-10-08T12:00:00.000Z",
    variant: "yellow",
  },
  {
    id: 11,
    title: "Call with Clients",
    startDate: "2024-10-10T14:00:00.000Z",
    endDate: "2024-10-10T15:00:00.000Z",
    variant: "purple",
  },
  {
    id: 12,
    title: "Product Launch Meeting",
    startDate: "2024-10-10T16:00:00.000Z",
    endDate: "2024-10-10T17:30:00.000Z",
    variant: "red",
  },
  {
    id: 13,
    title: "Team Lunch",
    startDate: "2024-10-10T12:00:00.000Z",
    endDate: "2024-10-10T13:30:00.000Z",
    variant: "green",
  },
  {
    id: 14,
    title: "Call with Sarah",
    startDate: "2024-10-16T19:00:00.000Z",
    endDate: "2024-10-16T22:00:00.000Z",
    variant: "blue",
  },
  {
    id: 15,
    title: "Call with Investors",
    startDate: "2024-10-18T09:00:00.000Z",
    endDate: "2024-10-18T10:30:00.000Z",
    variant: "gray",
  },
];

export default function Page() {
  const [view, setView] = useState<"day" | "week" | "month">("week");
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeMonth = (increment: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + increment);
      return newDate;
    });
  };

  return (
    <div className="h-fit w-full lg:rounded-xl lg:border">
      <Header currentDate={currentDate} onChangeMonth={changeMonth} setView={setView} />
      {view === "month" && <Month currentDate={currentDate} events={MOCK_EVENTS} />}
      {view === "week" && <Week currentDate={currentDate} events={MOCK_EVENTS} />}
    </div>
  );
}
