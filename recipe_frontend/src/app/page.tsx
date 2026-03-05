"use client";

import { useEffect, useMemo, useState } from "react";
import Shell from "../components/Shell";
import type { RecipeSummary } from "../lib/api";
import { listRecipes } from "../lib/api";
import Link from "next/link";

function RecipeCard({ r }: { r: RecipeSummary }) {
  return (
    <Link
      href={`/recipes/${r.id}`}
      className="group rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold text-slate-900 group-hover:text-slate-950">
            {r.title}
          </div>
          <div className="mt-1 line-clamp-2 text-sm text-slate-600">{r.description}</div>
        </div>
        <div className="shrink-0 rounded-xl bg-slate-50 px-3 py-1 text-xs text-slate-700">
          {r.total_time_minutes} min
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {r.cuisine ? (
          <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700">
            {r.cuisine}
          </span>
        ) : null}
        {r.diet ? (
          <span className="rounded-full bg-cyan-50 px-2 py-1 text-cyan-700">
            {r.diet}
          </span>
        ) : null}
        <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-700">
          {r.favorites_count} favorites
        </span>
      </div>
    </Link>
  );
}

export default function Home() {
  const [q, setQ] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");
  const [maxTime, setMaxTime] = useState<number | "">("");
  const [rows, setRows] = useState<RecipeSummary[]>([]);
  const [error, setError] = useState<string | null>(null);

  const params = useMemo(
    () => ({
      q: q.trim() || undefined,
      cuisine: cuisine.trim() || undefined,
      diet: diet.trim() || undefined,
      max_time: typeof maxTime === "number" ? maxTime : undefined,
    }),
    [q, cuisine, diet, maxTime],
  );

  useEffect(() => {
    let cancelled = false;
    setError(null);
    listRecipes(params)
      .then((data) => {
        if (!cancelled) setRows(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e?.message || "Failed to load recipes");
      });
    return () => {
      cancelled = true;
    };
  }, [params]);

  return (
    <Shell>
      <div className="flex flex-col gap-4">
        <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Browse recipes</h1>
            <p className="mt-1 text-sm text-slate-600">
              Search and filter by cuisine, diet, and total time.
            </p>
          </div>
          <div className="text-xs text-slate-500">
            Backend expected at <code>/api/recipes</code>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <label className="md:col-span-2">
            <div className="text-xs font-medium text-slate-600">Search</div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="e.g. pasta"
              className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
            />
          </label>

          <label>
            <div className="text-xs font-medium text-slate-600">Cuisine</div>
            <input
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              placeholder="e.g. Italian"
              className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
            />
          </label>

          <label>
            <div className="text-xs font-medium text-slate-600">Diet</div>
            <input
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              placeholder="e.g. Vegan"
              className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
            />
          </label>

          <label className="md:col-span-1">
            <div className="text-xs font-medium text-slate-600">Max time (minutes)</div>
            <input
              value={maxTime}
              onChange={(e) =>
                setMaxTime(e.target.value === "" ? "" : Number(e.target.value))
              }
              inputMode="numeric"
              placeholder="e.g. 30"
              className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
            />
          </label>
        </section>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {rows.map((r) => (
            <RecipeCard key={r.id} r={r} />
          ))}
        </section>

        {!error && rows.length === 0 ? (
          <div className="rounded-xl border border-black/5 bg-slate-50 p-4 text-sm text-slate-700">
            No recipes found. (If this is a fresh DB, create a user and add recipes via API.)
          </div>
        ) : null}
      </div>
    </Shell>
  );
}
