"use client";

import { useEffect, useState } from "react";

export function LiveChat({ videoId }: { videoId: string }) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    setSrc(
      `https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${window.location.hostname}&dark_theme=1`,
    );
  }, [videoId]);

  if (!src) {
    return (
      <div className="flex h-full min-h-[420px] items-center justify-center bg-panel text-xs uppercase tracking-[0.2em] text-white/35">
        Loading the chat…
      </div>
    );
  }

  return (
    <iframe
      src={src}
      title="Solo Gamingnp live chat"
      className="h-full w-full"
      allow="clipboard-write"
    />
  );
}
