import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.28em] text-brand">
      <span className="h-px w-7 bg-brand" aria-hidden="true" />
      {children}
    </p>
  );
}
