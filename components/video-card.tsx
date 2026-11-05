"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { formatDate, formatViews, type Video } from "@/lib/channel";
import { YouTubeLightbox } from "./youtube-lightbox";

export function VideoCard({ video }: { video: Video }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="video-card group relative overflow-hidden rounded-2xl border border-line bg-panel hover:border-brand/50 hover:shadow-[0_30px_80px_-40px_rgba(255,35,56,0.6)]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="block w-full text-left"
          aria-label={`Play ${video.title}`}
        >
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={video.thumb}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/20" />
            <span className="shine pointer-events-none absolute inset-0" />
            <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cream backdrop-blur">
              {video.tag}
            </span>
            <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-[11px] font-medium text-white/80 backdrop-blur">
              {formatViews(video.views)}
            </span>
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/40 transition duration-300 group-hover:scale-110">
                <Play className="h-5 w-5 translate-x-0.5 fill-current" />
              </span>
            </span>
          </div>
          <div className="p-5">
            <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-cream transition group-hover:text-brand-soft">
              {video.title}
            </h3>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
              {formatDate(video.published)}
            </p>
          </div>
        </button>
      </article>

      {open && (
        <YouTubeLightbox video={video} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
