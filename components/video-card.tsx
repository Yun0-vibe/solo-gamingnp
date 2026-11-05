"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { formatDate, formatViews, type Video } from "@/lib/channel";
import { YouTubeLightbox } from "./youtube-lightbox";

export function VideoCard({
  video,
  spotlight = false,
  priority = false,
  className = "",
}: {
  video: Video;
  spotlight?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article
        className={`video-card group relative overflow-hidden rounded-xl border border-line bg-panel hover:border-brand/60 hover:bg-panel-2 ${className}`}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="block h-full w-full text-left"
          aria-label={`Play ${video.title}`}
        >
          <div
            className={
              spotlight
                ? "relative h-full min-h-[300px] overflow-hidden sm:min-h-[360px] lg:min-h-[400px]"
                : "relative aspect-video overflow-hidden"
            }
          >
            <Image
              src={video.thumb}
              alt=""
              fill
              priority={priority}
              sizes={
                spotlight
                  ? "(min-width: 1024px) 50vw, 100vw"
                  : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              }
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <div
              className={
                spotlight
                  ? "absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/20"
                  : "absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/20"
              }
            />
            <span className="shine pointer-events-none absolute inset-0" />

            <span className="absolute left-3 top-3 rounded-full bg-black/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-cream">
              {video.tag}
            </span>

            {spotlight ? (
              <>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-black/50 transition duration-300 group-hover:scale-105 group-hover:bg-brand-soft">
                    <Play className="h-6 w-6 translate-x-0.5 fill-current" />
                  </span>
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-soft">
                    Watch the latest
                  </p>
                  <h3 className="mt-2 line-clamp-3 font-display text-2xl uppercase leading-[0.95] text-cream sm:text-3xl">
                    {video.title}
                  </h3>
                  <p className="mt-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                    <span>{formatDate(video.published)}</span>
                    <span className="h-1 w-1 rounded-full bg-white/25" />
                    <span>{formatViews(video.views)}</span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <span className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-[10px] font-semibold text-white/85">
                  {formatViews(video.views)}
                </span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white opacity-0 shadow-lg shadow-black/40 transition duration-300 group-hover:opacity-100 max-lg:opacity-100">
                    <Play className="h-4 w-4 translate-x-0.5 fill-current" />
                  </span>
                </span>
              </>
            )}
          </div>

          {!spotlight && (
            <div className="p-4">
              <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-cream transition group-hover:text-brand-soft">
                {video.title}
              </h3>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                {formatDate(video.published)}
              </p>
            </div>
          )}
        </button>
      </article>

      {open && (
        <YouTubeLightbox video={video} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
