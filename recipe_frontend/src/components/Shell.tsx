"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const nav = [
  { href: "/", label: "Browse" },
  { href: "/favorites", label: "Favorites" },
  { href: "/shopping-list", label: "Shopping List" },
  { href: "/meal-plans", label: "Meal Plan" },
];

export default function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--app-text)]">
      <div className="mx-auto max-w-6xl px-4 py-6 md:py-8">
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          <aside className="md:w-64">
            <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
              <div className="mb-3">
                <div className="text-sm font-medium text-slate-500">Recipe Hub</div>
                <div className="text-xl font-semibold">Dashboard</div>
              </div>
              <nav className="flex flex-row gap-2 md:flex-col">
                {nav.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={[
                        "rounded-xl px-3 py-2 text-sm transition",
                        active
                          ? "bg-slate-900 text-white"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <p className="mt-4 text-xs text-slate-500">
                Tip: set <code>NEXT_PUBLIC_API_BASE_URL</code> to your backend URL.
              </p>
            </div>
          </aside>

          <main className="flex-1">
            <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm md:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
