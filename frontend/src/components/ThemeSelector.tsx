"use client";

import { useState } from "react";
import { Sun, Moon, Monitor, ChevronDown } from "lucide-react";

type ThemeSelectorProps = {
  mobile?: boolean;
};

type Theme = "light" | "dark" | "auto";

const themeOptions = {
  light: {
    label: "Light",
    icon: Sun,
  },
  dark: {
    label: "Dark",
    icon: Moon,
  },
  auto: {
    label: "Auto",
    icon: Monitor,
  },
};

export default function ThemeSelector({ mobile = false }: ThemeSelectorProps) {
  const [theme, setTheme] = useState<Theme>("auto");
  const [themeOpen, setThemeOpen] = useState(false);

  function changeTheme(newTheme: Theme) {
    setTheme(newTheme);

    const root = document.documentElement;

    root.classList.remove("light", "dark");

    if (newTheme === "light") {
      root.classList.add("light");
    } else if (newTheme === "dark") {
      root.classList.add("dark");
    }

    setThemeOpen(false);
  }

  const CurrentIcon = themeOptions[theme].icon;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setThemeOpen((prev) => !prev)}
        className="flex cursor-pointer items-center gap-1"
      >
        <CurrentIcon size={16} />
        {themeOptions[theme].label}
        <ChevronDown size={16} />
      </button>

      {themeOpen && (
        <div
          className={
            mobile
              ? "mt-2 w-full rounded-md border border-border bg-background p-1 text-foreground"
              : "absolute right-0 z-10 mt-2 w-32 rounded-md border border-border bg-background p-1 text-foreground shadow-md"
          }
        >
          {(Object.keys(themeOptions) as Theme[]).map((option) => {
            const Icon = themeOptions[option].icon;

            return (
              <button
                key={option}
                type="button"
                onClick={() => changeTheme(option)}
                className="flex w-full cursor-pointer items-center gap-2 rounded px-3 py-2 text-left hover:bg-muted hover:text-black"
              >
                <Icon size={16} />
                {themeOptions[option].label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
