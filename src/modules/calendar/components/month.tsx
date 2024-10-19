import { cn } from "@/utils/cn";

export function Month() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1);
  const totalDays = firstDayOfMonth + daysInMonth;

  const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => ({
    day: daysInPrevMonth - firstDayOfMonth + i + 1,
    currentMonth: false,
  }));

  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    currentMonth: true,
  }));

  const nextMonthDays = Array.from({ length: (7 - (totalDays % 7)) % 7 }, (_, i) => ({
    day: i + 1,
    currentMonth: false,
  }));

  const allCells = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  return (
    <div>
      <div className="grid grid-cols-7 divide-x border-b">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <p key={day} className="flex items-center justify-center py-2 text-xs font-medium text-t-quaternary">
            {day}
          </p>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {allCells.map(({ day, currentMonth }, index) => (
          <div key={index} tabIndex={0} className={cn("flex flex-col gap-1 p-1.5 lg:p-2", index > 6 && "border-t", index % 7 !== 0 && "border-l")}>
            <span className={cn("size-6 text-xs font-semibold", !currentMonth && "opacity-50")}>{day}</span>
            <div className={cn("flex h-2 gap-1 sm:h-[86px] sm:flex-col", !currentMonth && "opacity-50")}></div>
            <p className={cn("h-4.5 text-xs font-semibold text-t-quaternary", !currentMonth && "opacity-50")}></p>
          </div>
        ))}
      </div>
    </div>
  );
}
