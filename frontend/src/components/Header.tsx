"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-sky-900">
      <div className="mx-16">
        <div className="flex mx-auto max-w-6xl items-center py-4">
          {/* Website name */}
          <div className="text-xl font-bold">Charlie Blog</div>

          {/* Desktop navigation */}
          <nav className="ml-8 hidden items-center gap-6 md:flex">
            <Link href="/">Home</Link>
            <Link href={"/about"}>About</Link>
          </nav>

          {/* Desktop user actions */}
          <div className="ml-auto hidden items-center gap-4 md:flex">
            <a>Login</a>
            <a>Register</a>
            <button>☀️</button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="ml-auto rounded-md border px-3 py-2 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="border-t px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <a>Home</a>
              <a>Posts</a>
              <a>About</a>
              <div className="flex justify-start gap-2">
                <a>Login</a>
                <a>Register</a>
              </div>

              <button type="button" className="text-left">
                ☀️ Theme
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
