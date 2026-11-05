import type { ReactNode } from "react";

export function Eyebrow({
  children,
  index,
}: {
  children: ReactNode;
  index?: string;
}) {
  return (
    <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-brand">
      {index && (
        <span className="font-mono font-medium tracking-normal text-white/30">
          {index}
        </span>
      )}
      <span className="h-px w-7 bg-brand" aria-hidden="true" />
      {children}
    </p>
  );
}
