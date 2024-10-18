import "@/styles/globals.css";

import type { Viewport } from "next";

import { inter, lexend, manrope } from "@/styles/fonts";
import { cn } from "@/utils/cn";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(inter.variable, lexend.variable, manrope.variable)}>
      <body>{children}</body>
    </html>
  );
}
