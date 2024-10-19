"use client";

import { useCallback, useEffect, useState } from "react";

import { useLocalStorage } from "@/hooks/use-local-storage";

export function BreakpointTag() {
  const [canRender, setCanRender] = useState(false);

  const [isHidden, setIsHidden] = useLocalStorage("@tc-breakpoint-tag", true);

  const handleChange = useCallback(() => setIsHidden(!isHidden), [isHidden, setIsHidden]);

  useEffect(() => {
    const defaultCommandKeydown = (e: KeyboardEvent) => {
      if (e.key === "b" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleChange();
      }
    };

    document.addEventListener("keydown", defaultCommandKeydown);
    return () => document.removeEventListener("keydown", defaultCommandKeydown);
  }, [handleChange]);

  useEffect(() => {
    if (window) {
      setCanRender(true);
    }
  }, []);

  if (!canRender) return null;
  if (isHidden) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-primary-600 px-2 py-1 font-medium text-white">
      <span className="flex xs:hidden">base</span>
      <span className="hidden xs:flex sm:hidden">xs</span>
      <span className="hidden sm:flex md:hidden">sm</span>
      <span className="hidden md:flex lg:hidden">md</span>
      <span className="hidden lg:flex xl:hidden">lg</span>
      <span className="hidden xl:flex 2xl:hidden">xl</span>
      <span className="hidden 2xl:flex">2xl</span>
    </div>
  );
}
