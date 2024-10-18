"use client";

import { useConfig } from "@/modules/theme/hooks/use-config";

import { Check } from "@/components/icons";
import { Button } from "@/components/button";

import { cn } from "@/utils/cn";

export function ChangePrimaryColor() {
  const [config, setConfig] = useConfig();

  return (
    <div className="flex">
      <Button
        variant="unstyled"
        onClick={() => setConfig({ ...config, colorTheme: "moss" })}
        className={cn("h-8 w-8 rounded-full border-2 border-theme-moss", config.colorTheme !== "moss" && "border-transparent")}
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-theme-moss">
          {config.colorTheme === "moss" && <Check className="size-4 text-white" />}
        </span>
      </Button>

      <Button
        variant="unstyled"
        onClick={() => setConfig({ ...config, colorTheme: "green" })}
        className={cn("h-8 w-8 rounded-full border-2 border-theme-green", config.colorTheme !== "green" && "border-transparent")}
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-theme-green">
          {config.colorTheme === "green" && <Check className="size-4 text-white" />}
        </span>
      </Button>

      <Button
        variant="unstyled"
        onClick={() => setConfig({ ...config, colorTheme: "teal" })}
        className={cn("h-8 w-8 rounded-full border-2 border-theme-teal", config.colorTheme !== "teal" && "border-transparent")}
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-theme-teal">
          {config.colorTheme === "teal" && <Check className="size-4 text-white" />}
        </span>
      </Button>

      <Button
        variant="unstyled"
        onClick={() => setConfig({ ...config, colorTheme: "cyan" })}
        className={cn("h-8 w-8 rounded-full border-2 border-theme-cyan", config.colorTheme !== "cyan" && "border-transparent")}
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-theme-cyan">
          {config.colorTheme === "cyan" && <Check className="size-4 text-white" />}
        </span>
      </Button>

      <Button
        variant="unstyled"
        onClick={() => setConfig({ ...config, colorTheme: "blue" })}
        className={cn("h-8 w-8 rounded-full border-2 border-theme-blue", config.colorTheme !== "blue" && "border-transparent")}
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-theme-blue">
          {config.colorTheme === "blue" && <Check className="size-4 text-white" />}
        </span>
      </Button>

      <Button
        variant="unstyled"
        onClick={() => setConfig({ ...config, colorTheme: "indigo" })}
        className={cn("h-8 w-8 rounded-full border-2 border-theme-indigo", config.colorTheme !== "indigo" && "border-transparent")}
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-theme-indigo">
          {config.colorTheme === "indigo" && <Check className="size-4 text-white" />}
        </span>
      </Button>

      <Button
        variant="unstyled"
        onClick={() => setConfig({ ...config, colorTheme: "purple" })}
        className={cn("h-8 w-8 rounded-full border-2 border-theme-purple", config.colorTheme !== "purple" && "border-transparent")}
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-theme-purple">
          {config.colorTheme === "purple" && <Check className="size-4 text-white" />}
        </span>
      </Button>

      <Button
        variant="unstyled"
        onClick={() => setConfig({ ...config, colorTheme: "violet" })}
        className={cn("h-8 w-8 rounded-full border-2 border-theme-violet", config.colorTheme !== "violet" && "border-transparent")}
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-theme-violet">
          {config.colorTheme === "violet" && <Check className="size-4 text-white" />}
        </span>
      </Button>

      <Button
        variant="unstyled"
        onClick={() => setConfig({ ...config, colorTheme: "fuchsia" })}
        className={cn("h-8 w-8 rounded-full border-2 border-theme-fuchsia", config.colorTheme !== "fuchsia" && "border-transparent")}
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-theme-fuchsia">
          {config.colorTheme === "fuchsia" && <Check className="size-4 text-white" />}
        </span>
      </Button>

      <Button
        variant="unstyled"
        onClick={() => setConfig({ ...config, colorTheme: "pink" })}
        className={cn("h-8 w-8 rounded-full border-2 border-theme-pink", config.colorTheme !== "pink" && "border-transparent")}
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-theme-pink">
          {config.colorTheme === "pink" && <Check className="size-4 text-white" />}
        </span>
      </Button>

      <Button
        variant="unstyled"
        onClick={() => setConfig({ ...config, colorTheme: "rose" })}
        className={cn("h-8 w-8 rounded-full border-2 border-theme-rose", config.colorTheme !== "rose" && "border-transparent")}
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-theme-rose">
          {config.colorTheme === "rose" && <Check className="size-4 text-white" />}
        </span>
      </Button>

      <Button
        variant="unstyled"
        onClick={() => setConfig({ ...config, colorTheme: "orange" })}
        className={cn("h-8 w-8 rounded-full border-2 border-theme-orange", config.colorTheme !== "orange" && "border-transparent")}
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-theme-orange">
          {config.colorTheme === "orange" && <Check className="size-4 text-white" />}
        </span>
      </Button>

      <Button
        variant="unstyled"
        onClick={() => setConfig({ ...config, colorTheme: "yellow" })}
        className={cn("h-8 w-8 rounded-full border-2 border-theme-yellow", config.colorTheme !== "yellow" && "border-transparent")}
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-theme-yellow">
          {config.colorTheme === "yellow" && <Check className="size-4 text-white" />}
        </span>
      </Button>
    </div>
  );
}
