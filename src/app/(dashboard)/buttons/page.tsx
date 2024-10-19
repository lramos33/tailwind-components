import { Button, ButtonGroup } from "@/components/button";
import { ChevronLeft, ChevronRight, Search } from "@/components/icons";

export default function Page() {
  return (
    <div>
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <Button size="icon-md" variant="destructive">
            <Search />
          </Button>

          <Button size="icon-md">
            <Search />
          </Button>

          <Button variant="outline" size="icon-md">
            <Search />
          </Button>

          <Button variant="ghost" size="icon-md">
            <Search />
          </Button>

          <Button variant="link">Link</Button>
        </div>

        <div className="flex items-center gap-3">
          <Button disabled size="icon-md" variant="destructive">
            <Search />
          </Button>

          <Button disabled size="icon-md">
            <Search />
          </Button>

          <Button disabled variant="outline" size="icon-md">
            <Search />
          </Button>

          <Button disabled variant="ghost" size="icon-md">
            <Search />
          </Button>

          <Button disabled variant="link">
            Link
          </Button>
        </div>

        <div className="flex gap-3">
          <Button size="icon-sm">
            <Search />
          </Button>

          <Button size="icon-md">
            <Search />
          </Button>

          <Button size="icon-lg">
            <Search />
          </Button>

          <Button size="icon-xl">
            <Search />
          </Button>

          <Button size="icon-2xl">
            <Search />
          </Button>
        </div>

        <div className="flex gap-3">
          <Button size="sm">
            <Search /> Search
          </Button>

          <Button size="md">
            <Search /> Search
          </Button>

          <Button size="lg">
            <Search /> Search
          </Button>

          <Button size="xl">
            <Search /> Search
          </Button>

          <Button size="2xl">
            <Search /> Search
          </Button>
        </div>

        <div className="flex flex-col items-center gap-6">
          <ButtonGroup>
            <Button>
              <ChevronLeft />
            </Button>
            <Button>
              <Search />
            </Button>
            <Button>
              <ChevronRight />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}
