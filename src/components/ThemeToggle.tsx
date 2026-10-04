"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Ativar tema ${nextTheme === "dark" ? "escuro" : "claro"}`}
      title={`Ativar tema ${nextTheme === "dark" ? "escuro" : "claro"}`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700/70 bg-zinc-900/60 text-zinc-300 transition-colors hover:border-red-400/50 hover:text-red-400"
    >
      {theme === "dark" ? (
        <Sun size={17} aria-hidden="true" />
      ) : (
        <Moon size={17} aria-hidden="true" />
      )}
    </button>
  );
}
