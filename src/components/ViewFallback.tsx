import React from 'react';

/**
 * Placeholder shown while a lazily-loaded route chunk is fetched.
 *
 * It mirrors the header-plus-cards rhythm the real views open with, so the
 * layout does not jump when the chunk arrives. On a warm cache the chunk
 * usually resolves within a frame, so this is deliberately quiet rather than a
 * spinner that would flash.
 */
export const ViewFallback: React.FC = () => (
  <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6" role="status" aria-busy="true">
    <span className="sr-only">Loading…</span>

    <div className="border-b border-slate-200 pb-5 space-y-2">
      <div className="h-4 w-40 rounded bg-slate-200 animate-pulse" />
      <div className="h-7 w-80 max-w-full rounded bg-slate-200 animate-pulse" />
      <div className="h-3 w-96 max-w-full rounded bg-slate-100 animate-pulse" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-28 rounded-xl border border-slate-200 bg-white shadow-sm animate-pulse"
        />
      ))}
    </div>
  </div>
);
