"use client";

import { useEffect, useState } from "react";

export function LiveChat({ videoId }: { videoId: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSrc(
      `https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${window.location.hostname}&dark_theme=1`,
    );
  }, [videoId]);

  return (
    <div className="relative h-full min-h-[420px] overflow-hidden bg-panel">
      {src ? (
        <iframe
          src={src}
          title="Solo Gamingnp live chat"
          loading="lazy"
          className="h-full w-full"
          allow="clipboard-write"
          // YouTube paints white until its dark theme boots; keep the skeleton
          // up for a beat after load so the panel never flashes.
          onLoad={() => window.setTimeout(() => setReady(true), 1500)}
        />
      ) : null}

      {!ready && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-panel"
        >
          <span className="flex items-center gap-1.5">
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-brand"
                style={{ animationDelay: `${index * 200}ms` }}
              />
            ))}
          </span>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">Connecting to chat…</p>
        </div>
      )}
    </div>
  );
}
