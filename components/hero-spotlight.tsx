"use client";

import { useEffect, useRef } from "react";

export function HeroSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = node.parentElement?.getBoundingClientRect();
        if (!rect) return;
        node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
        node.style.opacity = "1";
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700"
      style={{
        background:
          "radial-gradient(520px circle at var(--spot-x, 70%) var(--spot-y, 40%), rgba(255,35,56,0.18), transparent 62%)",
      }}
    />
  );
}
