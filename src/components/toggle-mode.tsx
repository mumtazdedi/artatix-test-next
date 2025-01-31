"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-4">
      <Sun
        className={cn(
          "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90",
          resolvedTheme === "dark" ? "text-slate-500" : "text-slate-900"
        )}
      />
      <Switch
        onCheckedChange={() => {
          if (resolvedTheme === "dark") {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
        checked={resolvedTheme === "dark"}
      />
      <Moon
        className={cn(
          "h-[1.2rem] w-[1.2rem] rotate-90 scale-100 transition-all dark:rotate-0",
          resolvedTheme === "dark" ? "text-white" : "text-slate-300"
        )}
      />
    </div>
  );
}
