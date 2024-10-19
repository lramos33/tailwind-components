import { cva, type VariantProps } from "class-variance-authority";

const eventStyles = cva("flex items-center justify-between gap-1.5 truncate whitespace-nowrap rounded-md border px-2 py-1 text-xs", {
  variants: {
    color: {
      blue: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
      green: "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
      red: "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
      yellow: "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
      purple: "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300",
      gray: "border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300",
    },
  },
  defaultVariants: {
    color: "gray",
  },
});

interface EventProps extends VariantProps<typeof eventStyles> {
  readonly title: string;
  readonly time: string;
}

export function Event({ title, time, color }: EventProps) {
  return (
    <div className={eventStyles({ color })}>
      <p className="flex-1 select-none truncate font-semibold">{title}</p>
      <p>{time}</p>
    </div>
  );
}
