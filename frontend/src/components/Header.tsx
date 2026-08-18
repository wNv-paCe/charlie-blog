"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeSelector from "./ThemeSelector";
import UserActions from "./UserActions";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-primary">
      <div className="mx-16">
        <div className="flex mx-auto max-w-6xl items-center py-2">
          {/* Website name */}
          <Link href="/" className="text-xl font-bold text-primary-foreground">
            Charlie Blog
          </Link>

          {/* Desktop navigation */}
          <nav className="text-primary-foreground font-semibold ml-8 hidden items-center gap-6 md:flex">
            <Link href="/">Home</Link>
            <Link href={"/about"}>About</Link>
          </nav>

          {/* Desktop user actions */}
          <div className="text-primary-foreground ml-auto hidden items-center gap-4 md:flex">
            <UserActions />
            <ThemeSelector />
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="ml-auto cursor-pointer rounded-md border-border border-2 text-primary-foreground px-3 py-2 md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="border-t border-border px-4 py-4 text-primary-foreground md:hidden">
            <nav className="flex flex-col gap-4">
              <Link href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href={"/about"} onClick={() => setIsOpen(false)}>
                About
              </Link>

              <UserActions onNavigate={() => setIsOpen(false)} />

              <ThemeSelector mobile />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
