"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type LiveState = { live: boolean; videoId: string | null };

export function LiveBadge({ className = "" }: { className?: string }) {
  const [state, setState] = useState<LiveState | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch("/api/live", { cache: "no-store" });
        const data = (await response.json()) as LiveState;
        if (active) setState(data);
      } catch {
        if (active) setState({ live: false, videoId: null });
      }
    };

    load();
    const timer = window.setInterval(load, 60_000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  if (!state?.live) return null;

  return (
    <Link
      href="/live"
      className={`group inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/15 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-soft backdrop-blur transition hover:border-brand hover:bg-brand hover:text-white ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-brand group-hover:bg-white" />
      </span>
      Live now
    </Link>
  );
}
