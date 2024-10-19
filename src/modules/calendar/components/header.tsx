import { Badge } from "@/components/badge";
import { Button, ButtonGroup } from "@/components/button";
import { ChevronLeft, ChevronRight, Columns, Grid3X3, List, Plus } from "@/components/icons";

export function Header() {
  return (
    <div className="flex items-center justify-between border-b px-6 py-5">
      <div className="flex items-center gap-3">
        <div className="h-14 w-16 overflow-hidden rounded-lg border">
          <p className="flex h-6 items-center justify-center bg-bg-secondary text-center text-xs font-semibold text-t-quaternary">JAN</p>
          <p className="flex items-center justify-center text-lg font-bold text-primary-600">10</p>
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold">January 2025</p>

            <Badge>Week 1</Badge>
          </div>

          <p className="text-sm text-t-tertiary">Jan 1, 2025 - Jan 31, 2025</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ButtonGroup>
          <Button>
            <ChevronLeft />
          </Button>

          <Button>Today</Button>

          <Button>
            <ChevronRight />
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button>
            <List />
            Day
          </Button>

          <Button>
            <Columns />
            Week
          </Button>

          <Button>
            <Grid3X3 />
            Month
          </Button>
        </ButtonGroup>

        <Button>
          <Plus />
          Add Event
        </Button>
      </div>
    </div>
  );
}
