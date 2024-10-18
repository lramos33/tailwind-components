"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="mt-10 space-y-2">
      <h1 className="text-2xl">Hello World</h1>

      <p>Current theme: {theme}</p>

      <button className="h-10 rounded-lg border bg-primary-600 px-6 font-medium text-white" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle theme
      </button>
    </div>
  );
}
