"use client";

import { useState } from "react";
import { Header } from "@/modules/calendar/components/header";
import { Month } from "@/modules/calendar/components/month";

export default function Page() {
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
      <Header currentDate={currentDate} onChangeMonth={changeMonth} />
      <Month currentDate={currentDate} />
    </div>
  );
}
