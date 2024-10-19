interface Event {
  id: number;
  title: string;
  variant: "blue" | "green" | "red" | "yellow" | "purple" | "gray";
  startDate: string;
  endDate: string;
}

interface WeekProps {
  readonly currentDate: Date;
  readonly events: Array<Event>;
}

export function Week({ currentDate, events }: WeekProps) {
  return (
    <div>
      <div className="grid grid-cols-7 divide-x border-b">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className="flex items-center justify-center py-2">
            <span className="text-xs font-medium text-t-quaternary">
              {day} <span className="font-semibold text-t-secondary">{/* TODO: Add day of the month */}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
