"use client";

import Link from "next/link";
import { useState } from "react";
import { Sun, Moon, Monitor, ChevronDown } from "lucide-react";

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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
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
    <header className="bg-sky-900">
      <div className="mx-16">
        <div className="flex mx-auto max-w-6xl items-center py-4">
          {/* Website name */}
          <Link href="/" className="text-xl font-bold text-gray-200">
            Charlie Blog
          </Link>

          {/* Desktop navigation */}
          <nav className="text-gray-300 font-semibold ml-8 hidden items-center gap-6 md:flex">
            <Link href="/">Home</Link>
            <Link href={"/about"}>About</Link>
          </nav>

          {/* Desktop user actions */}
          <div className="text-gray-300 ml-auto hidden items-center gap-4 md:flex">
            <a>Login</a>
            <a>Register</a>

            {/* Desktop Theme */}
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
                <div className="absolute right-0 z-10 mt-2 w-32 rounded-md border bg-background p-1 text-foreground shadow-md">
                  {(Object.keys(themeOptions) as Theme[]).map((option) => {
                    const Icon = themeOptions[option].icon;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => changeTheme(option)}
                        className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-gray-400 dark:hover:bg-gray-800"
                      >
                        <Icon size={16} />
                        {themeOptions[option].label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="ml-auto cursor-pointer rounded-md border-gray-400 border text-gray-300 px-3 py-2 md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="border-t border-gray-400 px-4 py-4 text-gray-300 md:hidden">
            <nav className="flex flex-col gap-4">
              <Link href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href={"/about"} onClick={() => setIsOpen(false)}>
                About
              </Link>
              <div className="flex justify-start gap-2">
                <a>Login</a>
                <a>Register</a>
              </div>

              {/* Mobile Theme */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setThemeOpen((prev) => !prev)}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <CurrentIcon size={16} />
                  {themeOptions[theme].label}
                  <ChevronDown size={16} />
                </button>

                {themeOpen && (
                  <div className="mt-2 w-full rounded-md border bg-background p-1 text-foreground shadow-md">
                    {(Object.keys(themeOptions) as Theme[]).map((option) => {
                      const Icon = themeOptions[option].icon;

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => changeTheme(option)}
                          className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-gray-400 dark:hover:bg-gray-800"
                        >
                          <Icon size={16} />
                          {themeOptions[option].label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
