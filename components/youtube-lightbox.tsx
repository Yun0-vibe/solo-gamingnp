"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ExternalLink, Link2, ThumbsUp, X } from "lucide-react";
import { formatViews, type Video } from "@/lib/channel";

export function YouTubeLightbox({
  video,
  onClose,
}: {
  video: Video;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const share = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://www.youtube.com/watch?v=${video.id}`,
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.open(
        `https://www.youtube.com/watch?v=${video.id}`,
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/95 p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand">
            Now playing
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-cream transition hover:border-brand hover:text-brand"
            aria-label="Close video"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-xl border border-white/15 bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-display text-lg uppercase leading-tight text-cream sm:text-2xl">
              {video.title}
            </h2>
            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/40">
              {video.tag} · {formatViews(video.views)}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              onClick={share}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-white/70 transition hover:border-brand hover:text-brand"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-brand" />
              ) : (
                <Link2 className="h-3.5 w-3.5" />
              )}
              {copied ? "Link copied" : "Copy link"}
            </button>
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-white/70 transition hover:border-brand hover:text-brand"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              Like on YouTube
            </a>
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-brand-soft"
            >
              Watch on YouTube
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
