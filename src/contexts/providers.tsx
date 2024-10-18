"use client";

import { useEffect } from "react";
import { ThemeProvider } from "next-themes";

import { useConfig } from "@/modules/theme/hooks/use-config";

interface IProps {
  readonly children: React.ReactNode;
}

export function Providers({ children }: IProps) {
  const [config] = useConfig();

  useEffect(() => {
    document.body.classList.forEach(className => {
      if (className.match(/^theme.*/)) document.body.classList.remove(className);
    });

    if (config.colorTheme) document.body.classList.add(`theme-${config.colorTheme}`);
  }, [config]);

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}
