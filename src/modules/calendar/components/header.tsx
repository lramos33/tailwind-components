import { Badge } from "@/components/badge";
import { Button, ButtonGroup } from "@/components/button";
import { ChevronLeft, ChevronRight, Columns, Grid3X3, List, Plus } from "@/components/icons";

export function Header() {
  return (
    <div className="flex items-center justify-between border-b px-6 py-5">
      <div className="flex items-center gap-3">
        <div className="h-14 w-16 overflow-hidden rounded-lg border">
          <p className="flex h-6 items-center justify-center bg-primary-600 text-center text-xs font-semibold text-white">JAN</p>
          <p className="flex items-center justify-center text-lg font-bold">10</p>
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold">January 2025</p>
            <Badge>Week 1</Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="size-6 px-0 [&_svg]:size-4">
              <ChevronLeft />
            </Button>

            <p className="text-sm text-t-tertiary">Jan 1, 2025 - Jan 31, 2025</p>

            <Button variant="outline" className="size-6 px-0 [&_svg]:size-4">
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
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

        <Button>
          <Plus />
          Add Event
        </Button>
      </div>
    </div>
  );
}
