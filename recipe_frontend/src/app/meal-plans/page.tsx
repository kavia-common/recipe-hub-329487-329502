"use client";

import Shell from "../../components/Shell";

export default function MealPlansPage() {
  return (
    <Shell>
      <h1 className="text-2xl font-semibold text-slate-900">Meal Plan</h1>
      <p className="mt-2 text-sm text-slate-600">
        MVP note: meal plan endpoints exist at <code>/api/meal-plans</code>.
      </p>
    </Shell>
  );
}
