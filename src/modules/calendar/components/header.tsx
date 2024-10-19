import { Button, ButtonGroup } from "@/components/button";

import { ChevronLeft, ChevronRight, Columns, Grid3X3, List, Plus } from "@/components/icons";

import { formatMonthRange } from "@/utils/date.helper";

interface HeaderProps {
  readonly currentDate: Date;
  readonly onChangeMonth: (increment: number) => void;
}

export function Header({ currentDate, onChangeMonth }: HeaderProps) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();

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
          <span className="text-lg font-semibold">{`${month} ${year}`}</span>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="size-6.5 px-0 [&_svg]:size-4.5" onClick={() => onChangeMonth(-1)}>
              <ChevronLeft />
            </Button>

            <p className="text-sm text-t-tertiary">{formatMonthRange(currentDate)}</p>

            <Button variant="outline" className="size-6.5 px-0 [&_svg]:size-4.5" onClick={() => onChangeMonth(1)}>
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <ButtonGroup>
          <Button>
            <List />
            <span className="hidden xl:block">Day</span>
          </Button>

          <Button>
            <Columns />
            <span className="hidden xl:block">Week</span>
          </Button>

          <Button>
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
