"use client";

import Shell from "../../components/Shell";

export default function FavoritesPage() {
  return (
    <Shell>
      <h1 className="text-2xl font-semibold text-slate-900">Favorites</h1>
      <p className="mt-2 text-sm text-slate-600">
        MVP note: favorite toggling is available via the backend API. A full favorites UI can be added next.
      </p>
    </Shell>
  );
}
