"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { formatDate, formatViews, type Video } from "@/lib/channel";
import { YouTubeLightbox } from "./youtube-lightbox";

export function FeaturedVideo({ video }: { video: Video }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div className="brackets relative overflow-hidden rounded-xl border border-line bg-panel">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-brand" />
            Latest drop
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
            {formatDate(video.published)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group block w-full text-left"
          aria-label={`Play latest video: ${video.title}`}
        >
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={video.thumb}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/25" />
            <span className="shine pointer-events-none absolute inset-0" />

            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-black/40 transition duration-300 group-hover:scale-105 group-hover:bg-brand-soft">
                <Play className="h-5 w-5 translate-x-0.5 fill-current" />
              </span>
            </span>

            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-soft">
                {video.tag}
              </p>
              <h2 className="mt-1.5 line-clamp-2 font-display text-lg uppercase leading-tight text-cream sm:text-xl">
                {video.title}
              </h2>
            </div>
          </div>
        </button>

        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
            {formatViews(video.views)}
          </span>
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/55 transition hover:text-brand"
          >
            Watch on YouTube
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-white/30 lg:text-left">
        Tap the card to watch right here
      </p>

      {open && (
        <YouTubeLightbox video={video} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}
