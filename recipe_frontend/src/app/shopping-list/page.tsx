"use client";

import Shell from "../../components/Shell";

export default function ShoppingListPage() {
  return (
    <Shell>
      <h1 className="text-2xl font-semibold text-slate-900">Shopping List</h1>
      <p className="mt-2 text-sm text-slate-600">
        MVP note: shopping list endpoints exist at <code>/api/shopping-list</code> and <code>/api/shopping-list/generate</code>.
      </p>
    </Shell>
  );
}
