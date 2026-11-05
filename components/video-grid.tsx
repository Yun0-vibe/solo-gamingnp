"use client";

import { useMemo, useState } from "react";
import type { Video } from "@/lib/channel";
import { VideoCard } from "./video-card";

const FILTER_ORDER = ["Valorant", "Roblox", "Minecraft", "Gear", "Gang stream"];

export function VideoGrid({ videos }: { videos: Video[] }) {
  const filters = useMemo(
    () => [
      "All",
      ...FILTER_ORDER.filter((tag) => videos.some((video) => video.tag === tag)),
    ],
    [videos],
  );
  const [active, setActive] = useState("All");

  const visible =
    active === "All" ? videos : videos.filter((video) => video.tag === active);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
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
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                  selected
                    ? "border-brand bg-brand text-white"
                    : "border-line bg-panel text-white/55 hover:border-brand/50 hover:text-cream"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
          {visible.length} {visible.length === 1 ? "video" : "videos"}
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            priority={index < 3 && active === "All"}
          />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="rounded-2xl border border-line bg-panel p-10 text-center text-sm text-white/50">
          Nothing in this category yet — the gang is working on it.
        </p>
      )}
    </div>
  );
}
