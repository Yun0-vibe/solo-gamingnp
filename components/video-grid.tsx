"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Video } from "@/lib/channel";
import { VideoCard } from "./video-card";

const FILTER_ORDER = [
  "Valorant",
  "Roblox",
  "Minecraft",
  "Gear",
  "GTA RP",
  "PUBG Mobile",
  "Gang stream",
];

const SORTS = [
  { value: "newest", label: "Newest first" },
  { value: "views", label: "Most viewed" },
  { value: "oldest", label: "Oldest first" },
] as const;

type SortKey = (typeof SORTS)[number]["value"];

export function VideoGrid({ videos }: { videos: Video[] }) {
  const filters = useMemo(
    () => [
      "All",
      ...FILTER_ORDER.filter((tag) => videos.some((video) => video.tag === tag)),
    ],
    [videos],
  );

  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const game = new URLSearchParams(window.location.search).get("game");
    if (game && filters.includes(game)) setActive(game);
  }, [filters]);

  const visible = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase();

    return videos
      .filter((video) => {
        const inTag = active === "All" || video.tag === active;
        const inQuery =
          needle.length === 0 ||
          video.title.toLowerCase().includes(needle) ||
          video.tag.toLowerCase().includes(needle);
        return inTag && inQuery;
      })
      .sort((a, b) => {
        if (sort === "views") return b.views - a.views;
        const diff =
          new Date(b.published).getTime() - new Date(a.published).getTime();
        return sort === "oldest" ? -diff : diff;
      });
  }, [videos, active, deferredQuery, sort]);

  const reset = () => {
    setActive("All");
    setQuery("");
    setSort("newest");
  };

  return (
    <div>
      <div className="rounded-xl border border-line bg-panel/60 p-3 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search titles or games…"
              aria-label="Search videos"
              className="h-11 w-full rounded-lg border border-line bg-ink pl-11 pr-10 text-sm text-cream placeholder:text-white/30 focus:border-brand/60 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white/40 transition hover:bg-white/5 hover:text-cream"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="relative shrink-0">
            <SlidersHorizontal className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              aria-label="Sort videos"
              className="h-11 w-full appearance-none rounded-lg border border-line bg-ink pl-10 pr-9 text-xs font-semibold uppercase tracking-wide text-white/70 focus:border-brand/60 focus:outline-none sm:w-48"
            >
              {SORTS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[9px] text-white/35"
            >
              ▼
            </span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div
            className="no-scrollbar flex gap-2 overflow-x-auto"
            role="group"
            aria-label="Filter videos by game"
          >
            {filters.map((filter) => {
              const selected = active === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActive(filter)}
                  aria-pressed={selected}
                  className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide transition ${
                    selected
                      ? "border-brand bg-brand text-white"
                      : "border-line bg-ink text-white/55 hover:border-brand/50 hover:text-cream"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
            {visible.length} of {videos.length} videos
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {visible.length === 0 && (
        <div className="mt-6 rounded-xl border border-line bg-panel p-10 text-center">
          <p className="font-display text-xl uppercase text-cream">
            No match in the archive
          </p>
          <p className="mt-2 text-sm text-white/45">
            Try a different game or clear the search.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-5 rounded-full border border-line px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white/70 transition hover:border-brand hover:text-brand"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
