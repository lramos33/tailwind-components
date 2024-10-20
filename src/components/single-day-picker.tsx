"use client";

import { buttonVariants } from "@/components/button";
import { ChevronLeft, ChevronRight } from "@/components/icons";
import { cn } from "@/utils/cn";
import type { ComponentProps } from "react";
import { type CustomComponents, DayPicker as ReactDayPicker } from "react-day-picker";

export type DayPickerProps = ComponentProps<typeof ReactDayPicker>;

export function SingleDayPicker({ className, classNames, showOutsideDays = true, ...props }: DayPickerProps) {
  return (
    <ReactDayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",

        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",

        nav: "space-x-1 flex items-center",
        nav_button: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        head_row: "flex",
        head_cell: "w-9 font-medium text-sm",
        row: "flex w-full mt-2",

        cell: "size-9 flex items-center justify-center text-t-secondary text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        day: cn(buttonVariants({ variant: "ghost" }), "size-8.5 p-0 font-normal aria-selected:opacity-100"),
        day_selected: "bg-primary-600 text-white hover:bg-primary-700 focus:bg-primary-700",
        day_today: "text-red-600 aria-selected:text-white",
        day_outside: "opacity-50 aria-selected:opacity-40",

        day_hidden: "invisible",
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
