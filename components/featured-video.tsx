"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { formatDate, type Video } from "@/lib/channel";
import { YouTubeLightbox } from "./youtube-lightbox";

export function FeaturedVideo({ video }: { video: Video }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-[2rem] border border-brand/25 bg-brand/5 blur-2xl"
      />
      <div className="relative animate-float rounded-2xl border border-white/12 bg-panel/90 p-2 shadow-2xl shadow-black/60 backdrop-blur">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group block w-full overflow-hidden rounded-xl text-left"
          aria-label={`Play latest video: ${video.title}`}
        >
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image
              src={video.thumb}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/30" />
            <span className="shine pointer-events-none absolute inset-0" />

            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-white" />
                Latest drop
              </span>
              <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white/70 backdrop-blur">
                {formatDate(video.published)}
              </span>
            </div>

            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/40 backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:ring-brand">
                <Play className="h-6 w-6 translate-x-0.5 fill-current" />
              </span>
            </span>

            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-soft">
                {video.tag}
              </p>
              <h2 className="mt-1.5 line-clamp-2 font-display text-xl uppercase leading-tight text-cream sm:text-2xl">
                {video.title}
              </h2>
            </div>
          </div>
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between px-1 text-[11px] uppercase tracking-[0.18em] text-white/35">
        <span>Tap to watch in site</span>
        <a
          href="https://www.youtube.com/@sologamingnp"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-white/55 transition hover:text-brand"
        >
          YouTube
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      {open && (
        <YouTubeLightbox video={video} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}
