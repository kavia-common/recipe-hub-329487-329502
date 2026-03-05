"use client";

import { useEffect, useState } from "react";
import Shell from "../../../components/Shell";
import type { RecipeDetail } from "../../../lib/api";
import { getRecipe } from "../../../lib/api";
import Link from "next/link";

export default function RecipeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    getRecipe(params.id)
      .then((r) => {
        if (!cancelled) setRecipe(r);
      })
      .catch((e) => {
        if (!cancelled) setError(e?.message || "Failed to load recipe");
      });

    return () => {
      cancelled = true;
    };
  }, [params.id]);

  return (
    <Shell>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-sm text-blue-700 hover:underline">
            ← Back to browse
          </Link>
          {recipe ? (
            <div className="text-xs text-slate-500">
              Total time: {recipe.total_time_minutes} min
            </div>
          ) : null}
        </div>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {!error && !recipe ? (
          <div className="text-sm text-slate-600">Loading…</div>
        ) : null}

        {recipe ? (
          <>
            <header>
              <h1 className="text-2xl font-semibold text-slate-900">{recipe.title}</h1>
              <p className="mt-2 text-sm text-slate-600">{recipe.description}</p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {recipe.cuisine ? (
                  <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700">
                    {recipe.cuisine}
                  </span>
                ) : null}
                {recipe.diet ? (
                  <span className="rounded-full bg-cyan-50 px-2 py-1 text-cyan-700">
                    {recipe.diet}
                  </span>
                ) : null}
                <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-700">
                  Servings: {recipe.servings}
                </span>
              </div>
            </header>

            <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Ingredients</h2>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {recipe.ingredients.map((i, idx) => (
                    <li key={idx}>
                      <span className="font-medium">{i.name}</span>{" "}
                      <span className="text-slate-500">
                        {(i.quantity || "").trim()} {(i.unit || "").trim()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">Steps</h2>
                <ol className="mt-2 space-y-2 text-sm text-slate-700">
                  {recipe.steps
                    .slice()
                    .sort((a, b) => a.step - b.step)
                    .map((s) => (
                      <li key={s.step} className="rounded-xl bg-slate-50 p-3">
                        <div className="text-xs font-semibold text-slate-500">
                          Step {s.step}
                        </div>
                        <div className="mt-1">{s.text}</div>
                      </li>
                    ))}
                </ol>
              </div>
            </section>
          </>
        ) : null}
      </div>
    </Shell>
  );
}
