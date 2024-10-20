"use client";

import { ChevronLeft, ChevronRight } from "@/components/icons";
import { cn } from "@/utils/cn";
import type { ComponentProps } from "react";
import { type CustomComponents, DayPicker as ReactDayPicker } from "react-day-picker";

export type DayPickerProps = ComponentProps<typeof ReactDayPicker>;

export function RawDayPicker({ className, classNames, showOutsideDays = true, ...props }: DayPickerProps) {
  return (
    <ReactDayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        month: "space-y-4 capitalize",
        months: "flex flex-row gap-4",

        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",

        nav: "flex items-center",
        nav_button: "size-7 p-0 border hover:bg-bg-secondary rounded-lg flex items-center justify-center",
        nav_button_next: "absolute right-1",
        nav_button_previous: "absolute left-1",

        cell: "size-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-lg [&:has([aria-selected].day-outside)]:bg-bg-secondary/50 [&:has([aria-selected])]:bg-bg-secondary first:[&:has([aria-selected])]:rounded-l-lg last:[&:has([aria-selected])]:rounded-r-lg",
        head_cell: "w-9 font-medium text-sm",

        row: "flex w-full mt-2",
        head_row: "flex",

        day: "size-9 font-normal rounded-lg aria-selected:opacity-100",
        day_today: "bg-bg-secondary text-t-primary",
        day_disabled: "cursor-not-allowed opacity-50 text-t-disabled",
        day_outside: "day-outside text-t-quaternary opacity-50 aria-selected:bg-bg-secondary/50 aria-selected:text-t-tertiary aria-selected:opacity-30",
        day_range_middle: "aria-selected:bg-bg-secondary aria-selected:text-t-primary",
        day_selected: "bg-primary-600 hover:bg-primary-700 text-white",
        day_range_end: "day-range-end",

        ...classNames,
      }}
      components={
        {
          IconLeft: () => <ChevronLeft className="size-4" />,
          IconRight: () => <ChevronRight className="size-4" />,
        } as Partial<CustomComponents>
      }
      {...props}
    />
  );
}
